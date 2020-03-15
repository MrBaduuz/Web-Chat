const bdy = document.querySelector('body');
const name_input = document.querySelector('#username_input');
name_input.onkeydown = (evt) =>  {if(name_input.value != "" && evt.key == 'Enter') socket.emit('login', {user: name_input.value});}
const submit_name = document.querySelector('#submit_login');
const msg_input = document.querySelector('#message_input');
msg_input.onkeydown = (evt) => {if(evt.key == 'Enter') sendMessage();}
const text_area = document.querySelector('#text_area');
loginWindow();

const socket = io('http://localhost:1234/');

let username = '';

submit_name.addEventListener('click', () => {
	if(name_input.value != "") socket.emit('login', {user: name_input.value});
});

socket.on('login', (data) => {
	if(data.can_login == true) {
		username = name_input.value;
		chatWindow();
	}
});

socket.on('sendMsg', (data) => {
	let name = data.user;
	if(name === username) name = 'You';
		text_area.innerHTML += '<p><b> ' + name + ': </b>' + data.msg;
});

function loginWindow() {
	bdy.removeChild(msg_input);
	bdy.removeChild(text_area);
}

function chatWindow() {
	bdy.removeChild(name_input);
	bdy.removeChild(submit_name);
	text_area.hidden = false;
	bdy.appendChild(text_area);
	msg_input.hidden = false;
	bdy.appendChild(msg_input);
}

function sendMessage() {
	let data = {
		user: username,
		msg: msg_input.value
	}
	socket.emit('sendMsg', data);
}