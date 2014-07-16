console.time('\033[32mGulp init time\033[0m');
var config = require('./config'),
    devMode = config.env === 'development',
    path = require('path'),

    // Gulp and plugins
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    clean = require('gulp-clean'),
    nodemon = require('gulp-nodemon'),
    notify = require('gulp-notify'),
    bower = require('bower'),
    mainBowerFiles = require('main-bower-files'),

    // File and folder locations
    files = {
        'bower': './bower.json',
        'sass': './server/scss/*.scss'
    },
    dirs = {
        'bower': './public/bower',
        'css': './public/css',
        'js': './public/js'
    };

gulp.task('clean', function() {
    gulp.src([dirs.bower, dirs.css, dirs.js])
        .pipe(clean());
});

gulp.task('sass', function() {
    gulp.src(files.sass)
        .pipe(sass({
            outputStyle: devMode ? 'nested' : 'compressed',
            errLogToConsole: false,
            onError: function(err) {
                return notify().write(err);
            }
        }))
        .pipe(gulp.dest(dirs.css));
});

gulp.task('bower', function() {
    bower.commands.install().on('end', function(installed) {
        var packages = Object.keys(installed).join(', ');

        if (packages.length) {
            gutil.log('Bower installed', gutil.colors.cyan(packages) + '.');
        }

        gulp.src(mainBowerFiles({
                env: config.env
            }))
            .pipe(rename(function(pathName) {
                pathName.basename = pathName.basename.replace(/\.min$/, '');
            }))
            .pipe(gulp.dest(dirs.bower));
    });
});

gulp.task('watch', function() {
    gulp.watch(files.bower, ['bower']);
    gulp.watch(files.sass, ['sass']);

    nodemon({
        'script': 'server.js',
        'ext': 'html js',
        'ignore': ['server/*/', 'node_modules/', 'bower_components/']
    });
});

gulp.task('build', ['clean', 'bower', 'sass']);

gulp.task('default', ['build', 'watch'], function() {
    console.timeEnd('\033[32mGulp init time\033[0m');
});
