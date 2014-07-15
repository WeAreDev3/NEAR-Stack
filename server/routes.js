var config = require('../config');

module.exports = function(app) {
    // The homepage
    app.route('/').get(function(req, res) {
        res.render('index', {
            title: 'Home',
            assets: {
                js: ['angular/angular.min.js'],
                css: ['normalize-css/normalize.css', 'main.css']
            }
        });
    });

    // A catch-all (i.e. 404)
    app.route('*').all(function(req, res) {
        res.render('404', {
            title: '404',
            assets: {
                js: ['angular/angular.min.js'],
                css: ['normalize-css/normalize.css', 'main.css']
            }
        });
    });
};
