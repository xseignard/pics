'use-strict';

console.log(__dirname);

const express = require('express');
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.post('/', function(req, res){
	console.log(req.body);
	res.sendStatus(200);
});

app.listen(3000);
