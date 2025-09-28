import { get, writable } from 'svelte/store';
import axios from 'axios';
import { PUBLIC_SERVER_URL } from '$env/static/public';

export const trains = writable([]);


function getFullState() {
  axios.get(`${PUBLIC_SERVER_URL}/state`)
    .then(res => {
      res.data.forEach(train => {
        if(train.speed < 0) {
          train.speed = - (101 + train.speed)
        }
      })
      trains.set(res.data)
    })
}

getFullState()


let socket = new WebSocket(`ws://${PUBLIC_SERVER_URL.replace("https://", "").replace("http://", "")}/ws`);

socket.onclose = () => {
  console.log("Socket closed! Reopening");
  socket =  new WebSocket(`ws://${PUBLIC_SERVER_URL.replace("https://", "").replace("http://", "")}/ws`);
};

// Listen for messages
socket.addEventListener("message", (event) => {

  let currentTrains = structuredClone(get(trains))
  let eventData = JSON.parse(event.data);

  switch (eventData.operation) {
    case "added_device":
      getFullState()
      break;
    case "deleted_device":
      getFullState()
      break;
    case "fail_counter_increment":
      currentTrains.forEach((train, index) => {
        if(train.name === eventData.device.name) {
          currentTrains[index].error_count += 1
        }
      })
      break;
    case "fail_counter_reset":
      currentTrains.forEach((train, index) => {
        if(train.name === eventData.device.name) {
          currentTrains[index].error_count = 0
        }
      })
      break;
    case "light_update":
      currentTrains.forEach((train, index) => {
        if(train.name === eventData.device.name) {
          currentTrains[index].light = eventData.device.light
        }
      })
      break;
    case "speed_update":
      currentTrains.forEach((train, index) => {
        if(train.name === eventData.device.name) {
          currentTrains[index].speed = eventData.device.speed
        }
      })
      break;
  }
  trains.set(currentTrains)
});

export function setSpeed(train, speed) {
  let parsedSpeed = parseInt(speed)
  if (parsedSpeed < 0) {
    parsedSpeed = - (101 + parsedSpeed)
  }

  socket.send(JSON.stringify({
    device: {
      name: train,
      speed: parsedSpeed,
    },
    operation: "set_speed"
  }));
}

export function setLight(train, light) {
  socket.send(JSON.stringify({
    device: {
      name: train,
      light: light,
    },
    operation: "set_light"
  }));
}

export function emergencyStop() {
  socket.send(JSON.stringify({
    operation: "emerg_stop"
  }));
}