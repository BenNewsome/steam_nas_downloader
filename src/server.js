'use strict';
var Steam = require('./steam')
const util = require('util')
var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 8090})

var steam = new Steam();

wss.on('connection', function (ws) {
    ws.on('message', function (message) {
        console.log('received: ');
        console.log(message['type']);
        if (message['type'] == 'download') {
            steam.downloadGame(message);
        };

    })

    setInterval(
        () => ws.send('${new Date()}'),
        5000
    )
})

wss.on('download', function(message) {
    console.log("received message to download.");
    console.log(message);
    steam.downloadGame(message)
});

