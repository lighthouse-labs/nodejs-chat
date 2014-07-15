var ChatApp = ChatApp || {};

ChatApp.ui = {};

ChatApp.ui.showMessage = function(user, message) {
  $('#conversation').append('<b>'+ user + ':</b> ' + message + "<br/>");
}

ChatApp.ui.refreshUsers = function(users) {
  $('#users').empty();
  $.each(users, function(name) {
    if(name === ChatApp.username) {
      $('#users').append('<div><b>' + name + '</b></div>');
    } else {
      $('#users').append('<div>' + name + '</div>');  
    }
  });
}

ChatApp.ui.userConnected = function(user, isSelf){
  if(isSelf) {
    $('#conversation').append('connected: <a href="#"> you </a><br/>');
  } else {
    $('#conversation').append('connected: <a href="#">' + user + "</a><br/>");   
  }
}

ChatApp.ui.userDisconnected = function(user) {
  $('#conversation').append('disconnected: <a href="#">' + user + "</a><br/>");
}

ChatApp.ui.sendMessage = function(message) {
  $('#data').val('');
}