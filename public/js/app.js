var socket = io();

var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');

socket.on('connect', function () {
	console.log('Connection established with server...');
});

socket.on('msg', function (message) {
	var momentTimeStamp = moment.utc(message.timeStamp);
	var $msg = jQuery('.messages');

	console.log(message.text);
	$msg.append('<p><strong>'+ message.name + ': </strong> '+ message.text + '     <i>' + momentTimeStamp.local().format('h:mm a') + '</i></p>');
});

// Handeling submit msg request
var $form = jQuery('#message-form');

$form.on('submit', function (event) {
	//to prevent refreshing page
	event.preventDefault();
	var $message = $form.find('input[name=message]');

	socket.emit('msg', {
		name: name,
		text: $message.val()
	});
	$message.val('');
});

// $form.find('input[name=message]').focus(function () {
// 	$this.val('');
// });