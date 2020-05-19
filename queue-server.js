'use strict';

const io = require('socket.io')(3001);

let queue = {
  flower: [],
  candy: [],
};

io.on('connection', (socket) => {
  console.log('Connected', socket.id);

  socket.on('subscribe', (payload) => {
    if (payload === 'flower') {
      console.log(socket.id, 'joined flower queue');
      socket.join('flower');
    } else if (payload === 'candy') {
      console.log(socket.id, 'joined candy queue');
      socket.join('candy');
    }
  });

  socket.on('getAll', (payload) => {
    if (payload === 'flower') {
      io.to('flower').emit('currentOrders', queue.flower);
    } else if (payload === 'candy') {
      io.to('candy').emit('currentOrders', queue.candy);
    }
  });

  socket.on('delivered', (payload) => {
    if (payload.vendor === 'flower') {
      queue.flower.push(payload);
      io.to('flower').emit('delivered', payload);
    } else if (payload.vendor === 'candy') {
      queue.candy.push(payload);
      io.to('candy').emit('delivered', payload);
    }
  });

  socket.on('received', (payload) => {
    if (payload.vendor === 'flower') {
      queue.flower.shift();
      io.to('flower').emit('currentOrders', queue.flower);
    } else if (payload.vendor === 'candy') {
      queue.candy.shift();
      io.to('candy').emit('currentOrders', queue.candy);
    }
  });
});
