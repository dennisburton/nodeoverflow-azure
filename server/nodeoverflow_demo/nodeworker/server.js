var port = process.env.port || 1337;
var express = require('express');
var app = express.createServer();

app.use(express.static(__dirname + '/public'));
app.listen(port);