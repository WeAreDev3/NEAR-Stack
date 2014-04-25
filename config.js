// Fix compatibility issues between Swig and AngularJS
require('swig').swig.setDefaults({
	'varControls': ['{=', '=}']
})

// Define all of the configurations that we want
module.exports = {
	port: process.env.PORT || 3000,
	root: __dirname
}