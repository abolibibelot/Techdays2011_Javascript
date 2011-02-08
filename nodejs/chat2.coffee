http = require 'http'
fs   = require 'fs'
io   = require 'socket.io'

server = http.createServer (req,res) -> 
     res.writeHead 200 , 'Content-Type': 'text/html; charset=utf-8'
     fs.readFile req.url.slice(1), (err,data) -> 
                                                console.log "ERR",err if err
                                                res.end data
                                                null

server.listen 8000

socket = io.listen server
messages = []
clients = {}

socket.on 'connection', (client) ->
					clients[client.sessionId] = client
					client.send(message) for message in messages					

					client.on 'message', (message) ->
							   messages.push message
							   client.send(message) for id, client of clients
							   null

					client.on 'disconnect', () ->
							   delete clients[client.sessionId]
							   null
							   
					null
