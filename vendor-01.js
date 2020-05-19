'use strict';

const io = require('socket.io-client');

const socket = io.connect('http://localhost:3001');

const vendor = 'flower';
let orders = [];

socket.emit('subscribe', vendor);

socket.on('delivered', (payload) => {
  console.log(`Thank you for delivering order ${payload.orderId}`);
  socket.emit('received', payload);
});

socket.on('currentOrders', (payload) => {
  orders = payload;
});

socket.emit('getAll', vendor);

setInterval(() => {
  if (orders.length > 0) {
    let order = orders.shift();
    console.log(`Thank you for delivering order ${order.orderId}`);
    socket.emit('received', order);
  }
}, 2500);
