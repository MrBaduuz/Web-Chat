const area = document.querySelector('#area');
const login = document.querySelector('#name');
const msg = document.querySelector('#text');
const button = document.querySelector('#submit');
const socket = io('http://localhost:1234/');

button.addEventListener('click', () => {
	let data = {
		user: login.value,
		msg: msg.value
	}
	socket.emit('send', data);
	msg.value = "";
})

socket.on('send', (data) => {
	let name = data.user;
	if(data.user === login.value) name = "You";
	area.innerHTML += '<p>' + name + ': ' + data.msg;
});