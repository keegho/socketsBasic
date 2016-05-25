var socket = io();

socket.on('connect', function () {
	console.log('Connection established with server...');
});

socket.on('msg', function (message) {
	console.log(message.text);
});