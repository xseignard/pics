var fs = require('fs'),
	os = require('os'),
	path = require('path'),
	rimraf = require('rimraf'),
	socketClient = require('socket.io-client'),
	conf = require('./conf/conf.js'),
	winston = require('winston')
	color = require('dominant-color'),
	takePicture = require('./hardware/camera');

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

// connect to the backend
var client = socketClient(conf.server);
client.on('connect', function(){
	logger.info('connected');
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