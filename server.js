var express = require('express');
var moment = require('moment');
var PORT = process.env.PORT || 3000;
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static(__dirname + '/public'));

var clientInfo = {};

io.on('connection', function (socket) {
	console.log('Connection established');

	socket.on('joinRoom', function (req) {
		socket.join(req.room);
		clientInfo[socket.id] = req;
		socket.broadcast.to(req.room).emit('msg',{
			name: 'System',
			text: req.name + ' joined',
			timeStamp: moment().valueOf()
		});
	});

	socket.on('msg', function (message) {
		console.log('Message recived: ' + message.text);

		message.timeStamp = moment().valueOf();
		io.to(clientInfo[socket.id].room).emit('msg', message);
		//socket.broadcast.emit('msg', message);
	});

	socket.emit('msg', {
		name: 'System',
		text: 'Welcome to the chat app',
		timeStamp: moment().valueOf()
	});
});

http.listen(PORT, function () {
	console.log('Server listening on port ' + PORT);
});