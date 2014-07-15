var ChatApp = ChatApp || {};

ChatApp.ui = {};

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
