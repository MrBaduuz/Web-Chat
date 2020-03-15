let socket = io('http://localhost:1234/');

function setup() {
	createCanvas(400, 400);
	background(50);
	socket.on('mouse', (data) => {
		fill(255, 0, 255);
		noStroke();
		ellipse(data.x, data.y, 30, 30);
	});
}

function mouseDragged() {
	fill(255);
	noStroke();
	ellipse(mouseX, mouseY, 30, 30);
	socket.emit("mouse", {x:mouseX, y:mouseY});
}