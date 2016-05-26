var socket = io();
// var sound = ion.sound({
// 	sounds: [{
// 		name: 'bell_ring'
// 	}],
// 	volume: 0.5,
// 	path: 'sounds/',
// 	preload: true
// });
var username = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room') || 'main';

var $roomname = jQuery('.room-name');
$roomname.text('Welcome to ' + room + ' chat room');


socket.on('connect', function() {
	console.log('Connection established with server...');
	socket.emit('joinRoom', {
		name: username,
		room: room
	});
});

socket.on('msg', function(message) {
	var momentTimeStamp = moment.utc(message.timeStamp);
	var $msg = jQuery('.messages');

	console.log(message.text);
	$msg.append('<p><strong>' + message.name + ': </strong> ' + message.text + '     <i>' + momentTimeStamp.local().format('h:mm a') + '</i></p>');
	//sound.play('bell_ring');
});

// Handeling submit msg request
var $form = jQuery('#message-form');

$form.on('submit', function(event) {
	//to prevent refreshing page
	event.preventDefault();
	var $message = $form.find('input[name=message]');

	socket.emit('msg', {
		name: username,
		text: $message.val()
	});
	$message.val('');
});






