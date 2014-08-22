var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server),

    path = require('path'),
    fs = require('fs'),
    gaze = require('gaze'),

    logFile = 'log.txt',
    JsDiff = require('diff');

require('colors');

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function(socket) {
    console.log('[io]'.blue, socket.id);

    socket.logData = '';

    socket.on('logData', function(logData) {
        socket.logData = logData;

        var stream = fs.createReadStream(logFile);

        stream.addListener('data', function(filedata) {
            stream.close();

            filedata = filedata.toString();
            socket.emit('log', JsDiff.createPatch('log.txt', socket.logData, filedata));
            socket.logData = filedata;
        });
    });

    socket.on('disconnect', function() {
        console.log('[io]'.red, socket.id);
    });
});

gaze(logFile, function(err, watcher) {
    if (err) {
        console.log('Error with watching %s: %O'.red, logFile, err);
        return;
    }

    watcher.on('changed', function() {
        setTimeout(function() {
            var stream = fs.createReadStream(logFile);

            stream.addListener('data', function(filedata) {
                filedata = filedata.toString();
                io.sockets.sockets.forEach(function(socket) {
                    socket.emit('log', JsDiff.createPatch('log.txt', socket.logData, filedata));

                    socket.logData = filedata;
                });
            });
        }, 1000);
    });
});

server.listen(4000, function() {
    console.log('Admin interface started on port 4000');
});
