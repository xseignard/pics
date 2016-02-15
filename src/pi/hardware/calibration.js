var _ = require('lodash');

var product = function() {
	return _.reduce(arguments, function(a, b) {
		return _.flatten(_.map(a, function(x) {
			return _.map(b, function(y) {
				return x.concat([y]);
			});
		}), true);
	}, [ [] ]);
};

var quality = [
	'-q 0',
	'-q 50',
	'-q 100'
];

var sharpness = [
	'-sh -100',
	'-sh -50',
	'-sh 0',
	'-sh 50',
	'-sh 100'
];
var contrast = [
	'-co -100',
	'-co -50',
	'-co 0',
	'-co 50',
	'-co 100'
];
var brigtness = [
	'-br 0',
	'-br 50',
	'-br 100'
];
var saturation = [
	'-sa -100',
	'-sa -50',
	'-sa 0',
	'-sa 50',
	'-sa 100'
];
var iso = [
	'-ISO 0',
	'-ISO 100',
	'-ISO 200',
	'-ISO 300',
	'-ISO 400',
	'-ISO 500',
	'-ISO 600',
	'-ISO 700',
	'-ISO 800'
];
var exposure = [
	'-ex auto',
	'-ex night',
	'-ex nightpreview',
	'-ex backlight',
	'-ex spotlight',
	'-ex sports',
	'-ex snow',
	'-ex beach',
	'-ex verylong',
	'-ex fixedfps',
	'-ex antishake',
	'-ex fireworks'
];
var awb = [
	'-awb off',
	'-awb auto',
	'-awb sun',
	'-awb cloud',
	'-awb shade',
	'-awb tungsten',
	'-awb fluorescent',
	'-awb incandescent',
	'-awb flash',
	'-awb horizon'
];
var metering = [
	'-mm average',
	'-mm spot',
	'-mm backlit',
	'-mm matrix'
];



var allOpts = product(contrast, brigtness, iso, exposure, awb, metering);

console.log(allOpts);