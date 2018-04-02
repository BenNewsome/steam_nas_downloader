// src/server.js
// This is the server componenets of the steam nas donwloader.

var Steam = require('./src/steam')
var express = require('express')
var ws = require('./src/server')

var port = 3000
// todo: specify the port in the config

var app = express()

app.get('/', function (request, response) {
    response.sendfile(__dirname + '/web/ws.html');
})

app.listen(port, function () {
    console.log("Example app listening on port " + port)
})




