const express = require('express');
const socket = require('socket.io');


const app = express();
app.use(express.static('public'));
const server = app.listen(1234);
console.log("Server running");

const io = socket(server);

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('send', (data) => {
  	console.log("Message received from " + data.user);
  	io.sockets.emit('send', data);
  });
});