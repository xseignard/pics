(function(io){

	var Pics = function(host, handleWinner) {
		this.socket = io.connect(host);
		this.handleWinner = handleWinner;
		var _self = this;
		this.socket.on('result', function(result) {
			console.log(result);
			if (result.id = '1.1' && !_self.result1) {
				_self.result1 = result;
			}
			else if (result.id = '1.2' && !_self.result2) {
				_self.result2 = result;
			}
			if (_self.result1 && _self.result2) {
				_self.handleWinner(_self.result1, _self.result2);
			}
		});
	};

	Pics.prototype.start = function(hexColor) {
		if (this.result1) delete this.result1;
		if (this.result2) delete this.result2;
		this.socket.emit('start', hexColor);
	};

	Pics.prototype.end = function() {
		this.socket.emit('take_picture');
	};

	Pics.prototype.win = function(objectId) {
		this.socket.emit('win', id);
	};

	Pics.prototype.led = function(objectId, on) {
		this.socket.emit('led', { objectId: objectId, on: on });
	};

	window.Pics = Pics;

})(io);