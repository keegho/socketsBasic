var express = require('express');
var PORT = process.env.PORT || 3000;
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', function () {
	console.log('Connection established')
});

http.listen(PORT, function () {
	console.log('Server listening on port ' + PORT);
});