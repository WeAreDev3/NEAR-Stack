var socket = io.connect(),
    logData = '',
    log = document.getElementById('log');

socket.on('connect', function() {
    socket.emit('logData', logData);
});

socket.on('log', function(diff) {
    logData = JsDiff.applyPatch(logData, diff);
    log.innerHTML = ansi2html(logData);
});
