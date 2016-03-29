'use strict';

const serialport = require('serialport');
const SerialPort = serialport.SerialPort;
const EventEmitter = require('events').EventEmitter;

class Leds extends EventEmitter {
	constructor(port) {
		super();
		this.sp = new SerialPort(port, {
			parser: serialport.parsers.readline('\n')
		});
		this.sp.once('open', () => {
			console.log('ready');
			this.emit('ready');
		});
	}
	ledOff() {
		console.log('off');
		this.sp.write('0#', (err, results) => {
			if (err) console.log(err);
		});
	}
	ledOn() {
		console.log('on');
		this.sp.write('1#', (err, results) => {
			if (err) console.log(err);
		});
	}
}

module.exports = Leds;
