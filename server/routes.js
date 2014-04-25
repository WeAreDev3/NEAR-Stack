module.exports = function(app) {
    // The homepage
    app.get('/', function (req, res) {
        res.render('index', { title: 'NEAR Stack' });
    });
    
    // A catch-all (i.e. 404)
    app.route('*').all(function (req, res) {
        res.render('404', { title: 'NEAR Stack - 404'});
    });
};