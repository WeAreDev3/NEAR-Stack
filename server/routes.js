module.exports = function(app) {
    app.get('/', function (req, res) {
        res.render('index', { title: 'NEAR Stack' });
    });
    app.route('*').all(function (req, res) {
        res.render('404', { title: 'NEAR Stack - 404'})
    })
};