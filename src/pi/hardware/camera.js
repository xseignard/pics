var exec = require('child_process').exec,
	path = require('path'),
	fs = require('fs');

var isRPi = function() {
	var procInfo = fs.readFileSync('/proc/cpuinfo', 'utf8');
	return procInfo.indexOf('BCM2708') > -1;
}

var takePicture = function(tmpDir, callback) {
	if (isRPi()) {
		var now = new Date(),
			fileName = path.join(tmpDir, now.getTime() + '.jpg');

		exec('raspistill -o ' + fileName, function (err, stdin, stdout) {
			callback(err, fileName);
		});
	}
	else {
		var dummyPic = path.join(__dirname, '..', '..', 'fixtures', 'dummyPic.jpg');
		console.log(dummyPic);
		callback(null, dummyPic);
	}
};

module.exports = takePicture;