'use strict';

const exec = require('child_process').exec;
const path = require('path');
const fs = require('fs');

const isRPi = () => {
	const procInfo = fs.readFileSync('/proc/cpuinfo', 'utf8');
	return procInfo.indexOf('BCM270') > -1;
};

const takePicture = (tmpDir, callback) => {
	if (isRPi()) {
		const now = new Date();
		const fileName = path.join(tmpDir, now.getTime() + '.jpg');

		exec('raspistill -w 1296 -h 972 -t 1 -n -o ' + fileName, (err, stdin, stdout) => {
			callback(err, fileName);
		});
	}
	else {
		const dummyPic = path.join(__dirname, '..', '..', '..', 'fixtures', 'dummyPic.jpg');
		console.log(dummyPic);
		callback(null, dummyPic);
	}
};

module.exports = takePicture;
