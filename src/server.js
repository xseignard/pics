'use strict';

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 3000;

const connectedObjects = {
	game1: [],
	game2: []
};

server.listen(port);

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
	// check if objects are connected
	socket.on('presence', (data) => {
		if (data.id.match(/1\.1|1\.2/)) connectedObjects.game1.push(socket);
		else if (data.id.match(/2\.1|2\.2/)) connectedObjects.game2.push(socket);
		console.log(connectedObjects.game1);
	});
	socket.on('disconnect', () => {
		console.log('Got disconnect!');
		const game1Index = connectedObjects.game1.indexOf(socket);
		const game2Index = connectedObjects.game2.indexOf(socket);
		if (game1Index > -1) connectedObjects.game1.splice(game1Index, 1);
		if (game2Index > -1) connectedObjects.game2.splice(game1Index, 1);
	});
	// check if objects are connected
	socket.on('check-presence', (data) => {
		console.log('presence');
		console.log(connectedObjects.game1);
		if (data.game === 1 && connectedObjects.game1.length === 2) {
			console.log('ready');
			socket.emit('game-ready', { game: 1, ready: true });
		}
		else if (data.game === 2 && connectedObjects.game2.length === 2) {
			socket.emit('game-ready', { game: 2, ready: true });
		}
	});
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
