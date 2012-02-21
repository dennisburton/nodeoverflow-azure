var port = process.env.port || 1337;
var express = require('express');
var app = express.createServer();
var io = require('socket.io').listen(app);

var OverflowStorage = require('./storage');
var storage = new OverflowStorage(io);
storage.createTables();

app.use(express.static(__dirname + '/public'));
app.listen(port);

io.sockets.on('connection', function(socket){
	console.log('client connected');

	socket.on('questions:read', storage.readQuestions.bind(storage));

	socket.on('questions:create', storage.createQuestion.bind(storage));

	socket.on('vote:add', storage.addVote.bind(storage));
});