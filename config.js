module.exports = {
	port: process.env.PORT || 3000,
	root: __dirname,
    devMode: (process.env.NODE_ENV || 'development') === 'development',
	appName: 'NEAR Stack'
};