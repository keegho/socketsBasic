var socket = io();

socket.on('connect', function () {
	console.log('Connection established with server...');
});