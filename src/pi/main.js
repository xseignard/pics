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
var host = (process.env.NODE_ENV === 'development') ? 'http://localhost:3000' : conf.server;

var client = socketClient(host);
client.on('connect', function() {
	logger.info('Connected');
});

// handle take picture event
client.on('rpi-take_picture', function() {
	logger.info('Take picture');
	takePicture(tmpDir, function(err, file) {
		if (!err && file) {
			color(file, function(err, color) {
				if (!err && color) {
					client.emit('rpi-result', { id: conf.deviceId, color: color });
				}
			});
		}
	});
});

// handle led event
client.on('rpi-led', function(on){
	logger.info('LED ' + on);
});

// handle win event
client.on('rpi-win', function(id){
	if (id === conf.deviceId) {
		logger.info('Win!');
	}
});

// shutdown hook
var cleanup = function() {
	logger.info('Closing app...');
	// cleanup tmp dir
	if (fs.existsSync(tmpDir)) rimraf.sync(tmpDir);
	process.exit();
};
process.on('SIGTERM', cleanup);
process.on('SIGINT', cleanup);