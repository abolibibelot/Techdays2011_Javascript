(function() {
  var clients, fs, http, io, messages, server, socket;
  http = require('http');
  fs = require('fs');
  io = require('socket.io');
  server = http.createServer(function(req, res) {
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    });
    return fs.readFile(req.url.slice(1), function(err, data) {
      if (err) {
        console.log("ERR", err);
      }
      res.end(data);
      return null;
    });
  });
  server.listen(8000);
  socket = io.listen(server);
  messages = [];
  clients = {};
  socket.on('connection', function(client) {
    var message, _i, _len;
    clients[client.sessionId] = client;
    for (_i = 0, _len = messages.length; _i < _len; _i++) {
      message = messages[_i];
      client.send(message);
    }
    client.on('message', function(message) {
      var client, id;
      messages.push(message);
      for (id in clients) {
        client = clients[id];
        client.send(message);
      }
      return null;
    });
    client.on('disconnect', function() {
      delete clients[client.sessionId];
      return null;
    });
    return null;
  });
}).call(this);
