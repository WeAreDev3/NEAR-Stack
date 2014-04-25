// Define all of the modules needed in the file
var app = require('express')(),
    swig = require('swig'),
    config = require('./config');

// Assign swig.renderFile to all .swig files
app.engine('swig', swig.renderFile);

// Set the default webpage file extension to .swig
app.set('view engine', 'swig');
app.set('views', config.root + '/server/views');

// Run our router module to prepare for incoming requests
require(config.root + '/server/routes')(app);

// Open the ports for business
app.listen(config.port);
console.log('Server running on port', config.port)