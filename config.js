var swig = require('swig');

swig.setDefaults({
	'varControls': ['{=', '=}']
})

module.exports = {
	port: process.env.PORT || 3000,
	root: __dirname
}