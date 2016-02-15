### Installation

Please install node.js on the RPi.

```sh
wget http://node-arm.herokuapp.com/node_latest_armhf.deb 
sudo dpkg -i node_latest_armhf.deb
```

Then clone this repo:

```sh
cd ~ && git clone https://github.com/xseignard/pics
```

Then go to the repo folder and install npm dependencies:

```sh
cd pics
npm install
```

### Configure wifi

Edit `/boot/wpa_supplicant.conf` and set the ssid and the passphrase.

### Calibration

Way too much combinations of options (almost 5 millions), it would be better to calibrate it manually.

~~Run `npm run calibration` and check taken pictures in `/home/pi/calibration`.~~

~~Each picture will be named like the following:~~

~~`pic_coXXX_brXXX_isoXXX_exXXX_awbXXX_mmXXX.jpg`~~

~~Please report each `XXX` in the `src/pi/conf/conf.yml` file in the according lines.~~

### Run it

Set the object id on `src/pi/conf/comf.yml` and you're good to go.


Then launch it with: `cd pics && npm run pi`

### Use the client lib

First include the `socket.io` library, by copying it locally or by linking the online version.

```html
<script src="js/socket.io.js"></script>
<!-- or -->
<script src="https://cdn.socket.io/socket.io-1.4.5.js"></script>
```

Then include the client lib, by copying it locally or by linking the online version:

```html
<script src="js/pics.js"></script>
<!-- or -->
<script src="http://playground-pics.herokuapp.com/js/pics.js"></script>
```

Then refer to this code to check how to use it:

```js
var expectedColor = document.querySelector('#expectedColor').innerText;

var result1_p = document.querySelector('#result1');
var result2_p = document.querySelector('#result2');

// will handle results
var handleWinner = function(result1, result2) {
	console.log(result1.delta, result2.delta);
	result1_p.innerText = result1.delta;
	result2_p.innerText = result2.delta;

	// the lowest delta is the winner
	if (result1.delta < result2.delta) {
		pics.win(result1.id);
		pics.lose(result2.id);
	}
	else {
		pics.win(result2.id);
		pics.lose(result1.id);
	}
}
// connect the app to the server
var pics = new Pics(location.host, handleWinner);

var start = document.querySelector('#start');
var ledOn = document.querySelector('#ledOn');
var ledOff = document.querySelector('#ledOff');

// duration of the match in ms
var gameDuration = 5000;

// will start a new game
start.onclick = function() {
	pics.start(expectedColor, gameDuration);
}


// will turn on leds on object 1.1
ledOn.onclick = function() {
	pics.led('1.1', true);
}

// will turn off leds on object 1.1
ledOff.onclick = function() {
	pics.led('1.1', false);
}
```

