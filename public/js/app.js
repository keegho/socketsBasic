var socket = io();

socket.on('connect', function () {
	console.log('Connection established with server...');
});

socket.on('msg', function (message) {
	console.log(message.text);
	jQuery('.messages').append('<p>'+ message.text +'</p>');
});

// Handeling submit msg request
var $form = jQuery('#message-form');

$form.on('submit', function (event) {
	//to prevent refreshing page
	event.preventDefault();
	var $message = $form.find('input[name=message]');

	socket.emit('msg', {
		text: $message.val()
	});
	$message.val('');
});

// $form.find('input[name=message]').focus(function () {
// 	$this.val('');
// });