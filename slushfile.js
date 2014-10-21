var gulp = require('gulp'),
    inq = require('inquirer'),
    install = require('gulp-install'),

    answers;

gulp.task('ask', function (done) {
    inq.prompt([
        {type: 'input', name: 'name', message: "App name:", default: "MyApp"},
        {type: 'input', name: 'description', message: 'App description', default: "A cool app"},
        {type: 'input', name: 'author', message: "Author (person or organization)"},
        {type: 'confirm', name: 'publishable', message: 'Will you be publishing to NPM', default: false},
        {type: 'input', name: 'repoLink', message: "What's the link to the repo"},
        {type: 'input', name: 'repoType', message: "What type of repo is it", default: "git"},
        {type: 'checkbox', name: 'dbs', message: "Which databases will you need support for?", choices: ['redis', 'rethinkdb', 'mongodb']},
        {type: 'confirm', name: 'ws', message: 'Do you need WebSockets support', default: false},
        {type: 'confirm', name: 'swig', message: 'Do you need swig templates', default: true},
        {type: 'confirm', name: 'mvc', message: 'Do you need MV* frameworks', default: false, when: function (ans) {
            return ans.swig;
        }},
        {type: 'confirm', name: 'passport', message: 'Will you be using passport for auth', default: false},
        {type: 'list', name: 'cssF', message: "Which CSS framework will you use?", default: 'foundation', choices: ['foundation', 'bootstrap', {name: 'None', value: false}]},
        {type: 'confirm', name: 'sass', message: "Will you be using SASS", default: true, when: function (ans) {
            return ans.cssF !== 'foundation';
        }},
        {type: 'confirm', name: 'admin', message: "Would you like to use NEAR admin monitor", default: false}],
        function (ans) {
            answers = ans;
            done();
        });
});

gulp.task('configure', ['ask'], function (done) {
    // setup the install
    console.log(answers);
});

gulp.task('default', ['ask', 'configure'], function () {
    console.log('\nYour NEAR stack is configured\n');
});