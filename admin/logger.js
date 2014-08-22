var fs = require('fs'),
    path = require('path'),
    logFile = fs.createWriteStream(path.join(__dirname, 'log.txt'), {
        flags: 'a',
        encoding: 'utf8'
    }),
    tmpLogs = [],
    old_stdout_write = process.stdout.write,
    writeIntercept = function(intercept, interceptParent) {
        return function(string, encoding, fd) {
            var args = Array.prototype.slice.call(arguments);
            old_stdout_write.apply(process.stdout, args);

            if (interceptParent) {
                intercept.call(interceptParent, string);
            } else {
                intercept(string);
            }
        };
    };

process.stdout.write = writeIntercept(function(log) {
    tmpLogs.push(log);
});

logFile.on('open', function() {
    process.stdout.write = writeIntercept(logFile.write, logFile);

    logFile.write(tmpLogs.join(''));
});
