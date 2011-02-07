#!/usr/bin/env node

var http = require('http');
var fs = require('fs');
var io = require('socket.io');

server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile(req.url.slice(1), function (err, data) {
        if (err) console.log("ERR", err);
        res.end(data);
    })
});
server.listen(8000);

// socket.io
var socket = io.listen(server);
var messages = [];
var clients = {};

socket.on('connection', function(client) {
    clients[client.sessionId] = client;

    messages.forEach(function(message) {
        client.send(message);
    })

    client.on('message', function(message) {
        messages.push(message);
        for (var clientId in clients) {
            clients[clientId].send(message);
        }
    })

    client.on('disconnect', function() {
        delete clients[client.sessionId];
    })
});
