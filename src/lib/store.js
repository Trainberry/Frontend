import { writable } from 'svelte/store';
import axios from 'axios';
import { PUBLIC_SERVER_URL } from '$env/static/public';

export const trains = writable([]);


function getTrains() {
    axios.get(`${PUBLIC_SERVER_URL}/trains`)
        .then(res => {
            trains.set(res.data)
        })
}

getTrains()
setInterval(getTrains, 5000)


export function enableLights(trainName) {
    axios.post(`${PUBLIC_SERVER_URL}/trains/${trainName}/lights`)
}

export function disableLights(trainName) {
    axios.delete(`${PUBLIC_SERVER_URL}/trains/${trainName}/lights`)
}

export function stop() {
    axios.get(`${PUBLIC_SERVER_URL}/stop`)
}

export function updateSpeed(trainName, newSpeed, newDirection) {
    axios.put(`${PUBLIC_SERVER_URL}/trains/${trainName}/speed`, { speed: newSpeed, is_going_forward: newDirection })
}
