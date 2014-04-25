var express = require('express'),
    swig = require('swig'),
    app = express(),
    config = require('./config');

// Assign swig.renderFile to all .swig files
app.engine('swig', swig.renderFile);

// Set default extension to .swig
app.set('view engine', 'swig');
app.set('views', __dirname + '/server/views');

app.get('/', function (req, res) {
    res.render('index', { title: 'NEAR Stack' });
});

app.listen(config.port);