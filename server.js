var express = require('express');
var moment = require('moment');
var PORT = process.env.PORT || 3000;
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
	console.log('Connection established');

	socket.on('msg', function (message) {
		console.log('Message recived: ' + message.text);

		message.timeStamp = moment().valueOf();
		io.emit('msg', message);
		//socket.broadcast.emit('msg', message);
	});

	socket.emit('msg', {
		text: 'Welcome to the chat app',
		timeStamp: moment().valueOf()
	});
});

http.listen(PORT, function () {
	console.log('Server listening on port ' + PORT);
});