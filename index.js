const express = require('express');
const socket = require('socket.io');


const app = express();
app.use(express.static('public'));
const server = app.listen(1234);
console.log("Server running");

const io = socket(server);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('mouse', (data) => {
  	console.log("X: " + data.x + "  Y: " + data.y);
  	socket.broadcast.emit('mouse', data);
  });
});