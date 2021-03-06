var express = require('express');
var moment = require('moment');
var PORT = process.env.PORT || 3000;
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static(__dirname + '/public'));

var clientInfo = {};

// Send current users in chat
function getCurrentUsers (socket) {
	var info = clientInfo[socket.id];
	var users = [];

	if(typeof info === 'undefined'){
		return;
	}

	Object.keys(clientInfo).forEach(function (socketId) {
		var userInfo = clientInfo[socketId];
	
		if(info.room === userInfo.room) {
			users.push(userInfo.name);
		}
	});

	socket.emit('msg', {
		name: 'System',
		text: 'Current users: ' + users.join(', '),
		timeStamp: moment().valueOf()
	});
	users = [];
};

io.on('connection', function(socket) {
	console.log('Connection established');

	socket.on('joinRoom', function(req) {

		socket.join(req.room);
		clientInfo[socket.id] = req;
		socket.broadcast.to(req.room).emit('msg', {
			name: 'System',
			text: req.name + ' joined',
			timeStamp: moment().valueOf()
		});
	});

	socket.on('disconnect', function() {
		var userData = clientInfo[socket.id];

		if (typeof userData !== 'undefined') {
			socket.leave(userData.room);
			io.to(userData.room).emit('msg', {
				name: 'System',
				text: userData.name + ' left the chat!',
				timeStamp: moment().valueOf()
			});
			//delete userData;
			delete clientInfo[socket.id];
		}
	});

	socket.on('msg', function(message) {
		console.log('Message recived: ' + message.text);

		if (message.text === '@currentusers') {
			getCurrentUsers(socket);
		} else {
			message.timeStamp = moment().valueOf();
			io.to(clientInfo[socket.id].room).emit('msg', message);
				//socket.broadcast.emit('msg', message);
		}

	});

	socket.emit('msg', {
		name: 'System',
		text: 'Welcome to the chat app',
		timeStamp: moment().valueOf()
	});
});

http.listen(PORT, function() {
	console.log('Server listening on port ' + PORT);
});