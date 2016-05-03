(function(){

	var Pics = function(host, gameId, handleWinner, handleObjects) {
		this.handleWinner = handleWinner;
		this.gameId = gameId;
		var _self = this;
		this.mockResult = function(result) {
			console.log(result);
			if (result.id === '1.1' && !_self.result1) {
				_self.result1 = result;
			}
			else if (result.id === '1.2' && !_self.result2) {
				_self.result2 = result;
			}
			if (_self.result1 && _self.result2) {
				_self.handleWinner(_self.result1, _self.result2);
			}
		};
		setTimeout(function() {
			handleObjects({
				game: gameId,
				ready: true
			});
		}, 3000);
	};

	Pics.prototype.start = function(hexColor, duration) {
		if (this.result1) delete this.result1;
		if (this.result2) delete this.result2;
		var _self = this;
		setTimeout(function() {
			_self.end();
		}, duration);
	};

	Pics.prototype.end = function() {
		var _self = this;
		var getRandomInt = function(min, max) {
			return Math.floor(Math.random() * (max - min)) + min;
		};

		var getRandomPalette = function() {
			var palette = [];
			for (var i = 0; i < 5; i++) {
				palette.push([
					getRandomInt(0, 255),
					getRandomInt(0, 255),
					getRandomInt(0, 255)
				]);
			}
			return palette;
		};
		var duration1 = getRandomInt(3000, 6000);
		var duration2 = getRandomInt(3000, 6000);
		setTimeout(function() {
			_self.mockResult({ id: '1.1', delta: getRandomInt(0, 100), palette: getRandomPalette() })
		}, duration1);
		setTimeout(function() {
			_self.mockResult({ id: '1.2', delta: getRandomInt(0, 100), palette: getRandomPalette() })
		}, duration2);
	};

	Pics.prototype.win = function(deviceId) {
		console.log('winner ' + deviceId + ' will turn its leds on');
	};

	Pics.prototype.lose = function(deviceId) {
		console.log('loser ' + deviceId + ' will turn its leds off');
	};

	Pics.prototype.led = function(deviceId, on) {
		var onOff = on ? 'on' : 'off';
		console.log('leds of ' + deviceId + ' will be turned ' + onOff );
	};

	window.Pics = Pics;

})();
