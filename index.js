const express = require('express');
const socket = require('socket.io');


const app = express();
app.use(express.static('public'));
const server = app.listen(1234);
console.log("Server running");

const io = socket(server);

io.on('connection', (socket) => {
	socket.on('login', (data) => {
		console.log("User " + data.user + " logged in");
		socket.emit('login', {can_login: true});
	});

  socket.on('sendMsg', (data) => {
  	io.sockets.emit('sendMsg', data);
  });
});