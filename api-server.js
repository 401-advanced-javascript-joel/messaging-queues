'use strict';

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const io = require('socket.io-client');

const app = express();
const socket = io.connect('http://localhost:3001');

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res, next) => {
  res.send('Homepage');
});

app.post('/delivery/:vendor/:orderId', (req, res, next) => {
  const payload = {
    vendor: req.params.vendor,
    orderId: req.params.orderId,
  };
  console.log('delivery', payload);
  if (!(payload.vendor === 'flower' || payload.vendor === 'candy')) {
    res.status(400).send();
  } else {
    socket.emit('delivered', payload);
    res.status(200).send();
  }
});

app.listen(3000, () => {
  console.log('API Server up and running on 3000');
});
