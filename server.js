// src/server.js
// This is the server componenets of the steam nas donwloader.

const express = require('express')
const Steam = require('./src/steam')
const http = require('http');
const WebSocket = require('ws');

//var ws = require('./src/server')

var port = 3000
// todo: specify the port in the config

var app = express()

//app.use(function (req, res) {
//    res.send({msg: "hello"});
//});

app.get('/', function (request, response) {
    response.sendfile(__dirname + '/web/ws.html');
})

const server = http.createServer(app);
const wss = new WebSocket.Server({ port: 8090 });

wss.on('connection', function connection(ws, req) {
//    const location = url.parse(req.url, true);

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    ws.send('something');
});

server.listen(8080, function listening() {
    console.log('Listening on %d, server.address().port');
});



app.listen(port, function () {
    console.log("Example app listening on port " + port)
})




