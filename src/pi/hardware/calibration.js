'use strict';

const _ = require('lodash');

const product = () => {
	return _.reduce(arguments, (a, b) => {
		return _.flatten(_.map(a, (x) => {
			return _.map(b, (y) => {
				return x.concat([y]);
			});
		}), true);
	}, [ [] ]);
};

const quality = [
	'-q 0',
	'-q 50',
	'-q 100'
];

const sharpness = [
	'-sh -100',
	'-sh -50',
	'-sh 0',
	'-sh 50',
	'-sh 100'
];
const contrast = [
	'-co -100',
	'-co -50',
	'-co 0',
	'-co 50',
	'-co 100'
];
const brigtness = [
	'-br 0',
	'-br 50',
	'-br 100'
];
const saturation = [
	'-sa -100',
	'-sa -50',
	'-sa 0',
	'-sa 50',
	'-sa 100'
];
const iso = [
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
const exposure = [
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
const awb = [
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
const metering = [
	'-mm average',
	'-mm spot',
	'-mm backlit',
	'-mm matrix'
];



const allOpts = product(contrast, brigtness, iso, exposure, awb, metering);

console.log(allOpts);
