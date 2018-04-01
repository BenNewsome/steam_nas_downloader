var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 8090})

wss.on('connection', function (ws) {
    ws.on('message', function (message) {
        console.log('received: %s', message)
    })

    setInterval(
        () => ws.send('${new Date()}'),
        5000
    )
})
