'use strict';

const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

// load configuration file
const confPath = path.join(__dirname, 'conf.yml');
const conf = yaml.safeLoad(fs.readFileSync(confPath, 'utf8'));

module.exports = conf;
