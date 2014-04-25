var express = require('express'),
    swig = require('swig'),
    app = express(),
    config = require('./config');

// Assign swig.renderFile to all .swig files
app.engine('swig', swig.renderFile);

// Set default extension to .swig
app.set('view engine', 'swig');
app.set('views', config.root + '/server/views');

require(config.root + '/server/routes')(app);

app.listen(config.port);