const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 3000;

server.listen(port);

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
	// dispatch start picture instructions to RPis
	socket.on('start', (data) => {
		socket.broadcast.emit('rpi-start', data);
	});
	// dispatch take picture instructions to RPis
	socket.on('take_picture', (data) => {
		socket.broadcast.emit('rpi-take_picture');
	});
	// dispatch led instructions to RPis
	socket.on('led', (data) => {
		socket.broadcast.emit('rpi-led', data);
	});
	// dispatch result message to the tablet
	socket.on('rpi-result', (data) => {
		socket.broadcast.emit('result', data);
	});
});