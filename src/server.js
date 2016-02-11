var express = require('express'),
	app = express(),
	server = require('http').Server(app),
	io = require('socket.io')(server);

var port = process.env.PORT || 3000;

server.listen(port);

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) { 
	// dispatch start picture instructions to RPis
	socket.on('start', function (data) {
		socket.broadcast.emit('rpi-start', data);
	});
	// dispatch take picture instructions to RPis
	socket.on('take_picture', function (data) {
		socket.broadcast.emit('rpi-take_picture');
	});
	// dispatch led instructions to RPis
	socket.on('led', function (data) {
		socket.broadcast.emit('rpi-led', data);
	});
	// dispatch win instructions to RPis
	socket.on('win', function (data) {
		socket.broadcast.emit('rpi-win', data);
	});
	// dispatch result message to the tablet
	socket.on('rpi-result', function (data) {
		socket.broadcast.emit('result', data);
	});
});