var config = require('./config'),
    path = require('path'),

    gulp = require('gulp'),
    sass = require('gulp-sass'),
    clean = require('gulp-clean'),
    nodemon = require('gulp-nodemon'),
    notify = require('gulp-notify'),

    files = {
        'sass': './server/scss/**/*.scss'
    },
    dirs = {
        'css': './public/css'
    };

gulp.task('clean', function() {
    gulp.src([dirs.css])
        .pipe(clean());
});

gulp.task('css', function() {
    gulp.src(files.sass)
        .pipe(sass({
            outputStyle: config.devMode ? 'nested' : 'compressed',
            errLogToConsole: false,
            onError: function(err) {
                return notify().write(err);
            }
        }))
        .pipe(gulp.dest(dirs.css));
});

gulp.task('watch', function() {
    gulp.watch(files.sass, ['css']);

    nodemon({
        'script': 'server.js',
        'ext': 'html js',
        'ignore': ['server/*/', 'node_modules/']
    });
});

gulp.task('build', ['clean', 'css']);

gulp.task('default', ['build', 'watch']);
