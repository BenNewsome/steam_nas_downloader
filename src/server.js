
var Steam = require('./steam')
var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 8090})

var steam = new Steam();

wss.on('connection', function (ws) {
    ws.on('message', function (message) {
        console.log('received: %s', message);
        if (typeof message === 'object') {
            console.log(JSON.stringify(message, null, 4))
        };
        if (message['type'] == 'download') {
            steam.downloadGame(message);
        };

    })

    setInterval(
        () => ws.send('${new Date()}'),
        5000
    )
})

