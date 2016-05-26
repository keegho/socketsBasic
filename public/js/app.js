var socket = io();
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
	ion.sound({
		sounds: [{
			name: 'bell_ring'
		}, {

			name: 'button_tiny'
		}],
		volume: 0.3,
		path: 'sounds/',
		preload: true
	});
	var momentTimeStamp = moment.utc(message.timeStamp);
	var $msg = jQuery('.messages');

	if (message.name === 'System') {
		$msg.append('<p style="color:red"><strong>' + message.name + ': </strong> ' + message.text + '    &nbsp<i>' + momentTimeStamp.local().format(' h:mm a') + '  <i class="glyphicon glyphicon-time"></i></i></p>');
	} else {
		$msg.append('<p><strong>' + message.name + ': </strong> ' + message.text + '    &nbsp <i>' + momentTimeStamp.local().format(' h:mm a') + '  </i><i class="glyphicon glyphicon-time"></i></p>');
	}

	ion.sound.play('button_tiny');
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