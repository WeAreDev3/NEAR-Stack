var express = require('express'),
	app = express(),
	config = require('./config');

app.get('/', function (req, res) {
	res.send('Hello, world!');
});

app.listen(config.port);