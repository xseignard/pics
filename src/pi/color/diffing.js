'use strict';

const path = require('path');
const gm = require('gm').subClass({ imageMagick: true });

/*
// usage example
const img = path.join(__dirname, '../../../fixtures/overlay_figure.gif');
const background = path.join(__dirname, '../../../fixtures/overlay_bgnd.gif');
const tmpDir = path.join(__dirname, '../../../fixtures/');

diffing(img, background, tmpDir, (err, fileName) => {
	console.log(fileName);
});
*/

const diffing = (img, background, tmpDir, cb) => {
	const now = new Date();
	const fileName = path.join(tmpDir, now.getTime() + '.png');
	gm(img)
		.composite(background)
		.compose('ChangeMask')
		.write(fileName, function(err) {
			cb(err, fileName);
		});
};

module.exports = diffing;
