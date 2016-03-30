'use strict';

const path = require('path');
const getPixels = require('get-pixels');
const getRgbaPalette = require('get-rgba-palette');
const convert = require('color-convert');
const DeltaE = require('delta-e');

/*
// usage example
const fileName = path.join(__dirname, '..', '..', '..', 'fixtures', 'dummyPic.jpg');
const converted = convert.hex.lab('ffffff');
const expectedLabColor = {
	L: converted[0],
	A: converted[1],
	B: converted[2]
};

analyze(fileName, expectedColor, (err, result) => {
	if (err) console.log(err);
	console.log(result);
});
*/

const getPalette = (fileName, callback) => {
	getPixels(fileName, (err, pixels) => {
		if (err) return callback(err, null);
		const palette = getRgbaPalette(pixels.data, 5);
		return callback(null, palette);
	});
};

const analyze = (fileName, expectedLabColor, callback) => {
	getPalette(fileName, (err, palette) => {
		if (err) return callback(err, null);
		let minDelta = null;
		palette.forEach((color) => {
			const labColor = convert.rgb.lab(color);
			const delta = DeltaE.getDeltaE00(
				expectedLabColor,
				{ L: labColor[0], A: labColor[1], B: labColor[2] }
			);
			if (!minDelta) minDelta = delta;
			else if (delta < minDelta) minDelta = delta;
		});
		callback(null, { palette, delta: minDelta });
	});
};

module.exports = analyze;
