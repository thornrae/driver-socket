'use strict';

const io = require('socket.io-client');

const host = 'http://localhost:3000';

const socket = io.connect(host);

const capsConnection = io.connect(`${host}/caps`);

require('dotenv').config();

capsConnection.on('pickup', pickUp);
capsConnection.on('in-transit', delivered);

// function inTransit(payload){
//   pickUp();
//   delivered();
// }


function pickUp(payload){
  setTimeout(() => {
  console.log(`DRIVER: picked up ${payload.orderId}`)
  capsConnection.emit('in-transit', payload)
}, 1000)
}


function delivered(payload){
setTimeout( () => {
  console.log(`DRIVER: delivered ${payload.orderId}`);
  capsConnection.emit('delivered', payload);
}, 3000) 
}