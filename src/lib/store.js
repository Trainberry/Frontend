import { writable } from 'svelte/store';
import axios from 'axios';

export const trains = writable([]);
const host= 'http://localhost:8080' //TODO variabilze!


function getTrains() {
    axios.get(`${host}/trains`)
    .then(res => {
        trains.set(res.data)
    })
}

getTrains()
setInterval(getTrains, 5000)


export function enableLights(trainName) {
    axios.post(`${host}/trains/${trainName}/lights`)
}

export function disableLights(trainName) {
    axios.delete(`${host}/trains/${trainName}/lights`)
}

export function stop() {
    axios.get(`${host}/stop`)
}

export function updateSpeed(trainName, newSpeed, newDirection) {
    axios.put(`${host}/trains/${trainName}/speed`, {speed: newSpeed, is_going_forward: newDirection})
}
