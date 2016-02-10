var fs = require('fs'),
	os = require('os'),
	path = require('path'),
	rimraf = require('rimraf'),
	Firebase = require('firebase');
	conf = require('./conf/conf.js'),
	winston = require('winston')
	color = require('dominant-color'),
	takePicture = require('./hardware/camera');

var dataRef = new Firebase('https://resplendent-heat-1777.firebaseio.com/');

// logger
var logger = new winston.Logger({
	transports: [
		new winston.transports.Console()
	]
});
// tmp dir
var tmpDir = path.join(os.tmpdir(), 'pics');
// cleanup tmp dir
if (fs.existsSync(tmpDir)) rimraf.sync(tmpDir);
// recreate dir (cleaned!)
fs.mkdirSync(tmpDir);

// wait for firebase messages
dataRef.on('child_added', function (snapshot) {
	var msg = snapshot.val();
	switch (msg.type) {
		case 'take_picture':
			console.log('take_picture');
			break;
		case 'leds':
			console.log('leds');
			break;
	}
});

// send message to pusher
var send = function(event, data) {
	dataRef.push(Object.assign({}, {type: event}, data));
};
//send('take_picture', {my: 'test'});

// shutdown hook
var cleanup = function() {
	logger.info('Closing app...');
	// cleanup tmp dir
	if (fs.existsSync(tmpDir)) rimraf.sync(tmpDir);
	process.exit();
};
process.on('SIGTERM', cleanup);
process.on('SIGINT', cleanup);