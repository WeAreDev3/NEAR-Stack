var express = require('express'),
	app = express(),
	config = require('./config');

app.get('/', function (req, res) {
	res.send('Hello, world!');
});

var port = process.env.PORT || 3000;

app.listen(port);