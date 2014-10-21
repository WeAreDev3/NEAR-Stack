var express = require('express'),
    app = express(),
    swig = require('swig'),

    // Middleware
    morgan = require('morgan'),
    compression = require('compression'),
    bodyParser = require('body-parser'),

    // Helpers
    path = require('path'),
    config = require('./config'),
    devMode = config.env === 'development';

app.use(compression());

swig.setDefaults({
    cache: devMode ? false : 'memory',
    locals: {
        now: function() {
            return new Date();
        },
        appName: config.appName
    }
});

if (devMode) {
    app.use(morgan('dev'));
}

app.use(bodyParser.json());

// Set up templating engine
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(config.root, 'server/views'));

// Public files
app.use(express.static(path.join(config.root, 'public')));
app.use(express.static(path.join(config.root, 'public/bower')));
app.use(express.static(path.join(config.root, 'public/css')));
app.use(express.static(path.join(config.root, 'public/js')));
app.use(express.static(path.join(config.root, 'public/partials')));

// Path router
require(path.join(config.root, 'server/routes'))(app);

// Open the ports for business
app.listen(config.port, function() {
    console.log('%s running on port %d in %s mode', config.appName, config.port, config.env);
});