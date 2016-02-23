const fs = require('fs');
const os = require('os');
const path = require('path');
const rimraf = require('rimraf');
const socketClient = require('socket.io-client');
const conf = require('./conf/conf.js');
const winston = require('winston')
const convert = require('color-convert');
const takePicture = require('./hardware/camera');
const analyze = require('./color/analyze')

// logger
const logger = new winston.Logger({
	transports: [
		new winston.transports.Console()
	]
});
// tmp dir
const tmpDir = path.join(os.tmpdir(), 'pics');
// cleanup tmp dir
if (fs.existsSync(tmpDir)) rimraf.sync(tmpDir);
// recreate dir (cleaned!)
fs.mkdirSync(tmpDir);

// connect to the backend
const host = (process.env.NODE_ENV === 'development') ? 'http://localhost:3000' : conf.server;

const client = socketClient(host);
client.on('connect', () => {
	logger.info('Connected');
});

var expectedLabColor;
// handle take picture event
client.on('rpi-start', (expectedColor) => {
	logger.info('Start');
	const converted = convert.hex.lab(expectedColor);
	expectedLabColor = {
		L: converted[0],
		A: converted[1],
		B: converted[2]
	};
});

// handle take picture event
client.on('rpi-take_picture', () => {
	logger.info('Take picture');
	takePicture(tmpDir, (err, file) => {
		if (!err && file) {
			analyze(file, expectedLabColor, (err, result) => {
				if (!err && result) {
					client.emit('rpi-result', Object.assign({ id: conf.deviceId }, result ));
				}
			});
		}
	});
});

// handle led event
client.on('rpi-led', (data) => {
	if (data.deviceId === conf.deviceId) {
		logger.info('LED ' + data.on);
		// TODO turn on/off leds
	}
});

// shutdown hook
const cleanup = () => {
	logger.info('Closing app...');
	// cleanup tmp dir
	if (fs.existsSync(tmpDir)) rimraf.sync(tmpDir);
	process.exit();
};
process.on('SIGTERM', cleanup);
process.on('SIGINT', cleanup);