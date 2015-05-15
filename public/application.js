var socket = io.connect('/');

$(function(){
  var username = 'daffy';

  $("button#send").on('click', function(){
    console.log("Sending message");
    var message = $("#data").val()
    // send message to sockets server
    socket.emit('funky-server-message', {username: username, message: message});
    // display message immediately
    $("#conversation").append(message);
    $("#conversation").append('<br>');
  });
});

socket.on('incoming-message', function(data) {
  $("#conversation").append(data);
  $("#conversation").append('<br>');
});
