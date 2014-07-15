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

ChatApp.ui.sendMessage = function(message) {
  $('#data').val('');
}