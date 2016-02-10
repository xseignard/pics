(function(io){

	var Pics = function(host, handleResults) {
		this.socket = io.connect(host);
		this.handleResults = handleResults;
		var _self = this;
		this.socket.on('result', function(result) {
			console.log(result);
			if (result.id = '1.1' && !_self.result1) {
				_self.result1 = result.color;
			}
			else if (result.id = '1.2' && !_self.result2) {
				_self.result2 = result.color;
			}
			if (_self.result1 && _self.result2) {
				_self.handleResults(_self.result1, _self.result2);
			}
		});
	};

	Pics.prototype.start = function() {
		if (this.result1) delete this.result1;
		if (this.result2) delete this.result2;
		this.socket.emit('take_picture');
	};

	Pics.prototype.win = function(id) {
		this.socket.emit('win', id);
	};

	Pics.prototype.led = function(on) {
		this.socket.emit('led', on);
	};

	window.Pics = Pics;

})(io)