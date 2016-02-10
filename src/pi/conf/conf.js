var yaml = require('js-yaml'),
	fs = require('fs'),
	path = require('path');

// load configuration file
var confPath = path.join(__dirname, 'conf.yml');
var conf = yaml.safeLoad(fs.readFileSync(confPath, 'utf8'));

module.exports = conf;