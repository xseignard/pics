var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 3000;

server.listen(port);

io.on('connection', function (socket) { 
	// dispatch take picture instructions to RPis
	socket.on('take_picture', function (data) {
		socket.broadcast.emit('rpi-take_picture');
	});
	// dispatch led instructions to RPis
	socket.on('led', function (data) {
		socket.broadcast.emit('rpi-led', data);
	});
	// dispatch result message to the tablet
	socket.on('result', function (data) {
		socket.broadcast.emit('tablet-result', data);
	});
});