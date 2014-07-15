var ChatApp = ChatApp || {};

ChatApp.connect = function() {
  this.setAnonymousUsername();
  this.socket = io.connect('/');
  this.setupSocketListeners();
};

ChatApp.setUsername = function(name) {
  this.username = name;
};

ChatApp.setAnonymousUsername = function() {
  this.setUsername(this._generateRandomUser());
}

ChatApp._generateRandomUser = function(){
  return "Anonymous" + Math.floor(Math.random() * 100);  
}

ChatApp.sendMessage = function(message) {
  console.log(message);
  // tell server to execute 'sendchat' and send along one parameter
  ChatApp.socket.emit('sendchat', message);
  ChatApp.ui.sendMessage(message);
}

ChatApp.setupSocketListeners = function() {
  // on connection to server, ask for user's name with an anonymous callback
  this.socket.on('connect', function() {
    // call the server-side function 'adduser' and send one parameter (value of prompt)
    ChatApp.socket.emit('adduser', ChatApp.username);
  });

  // listener, whenever the server emits 'updatechat', this updates the chat body
  this.socket.on('updatechat', function (username, data) {
    ChatApp.ui.showMessage(username, data)
  });

  // listener, whenever the server emits 'updateusers', this updates the username list
  this.socket.on('updateusers', function(users) {
    ChatApp.ui.refreshUsers(users)
  });

  this.socket.on('servernotification', function (data) {
    if(data.connected) {
      ChatApp.ui.userConnected(data.username, !!data.to_self)
    } else {
      ChatApp.ui.userDisconnected(data.username)
    }
  });
}

ChatApp.setupDOMListeners = function(){
  // when the client hits ENTER on their keyboard
  $('#data').on('keypress', function(e) {
    if(e.which == 13) {
      var message = $('#data').val();
      ChatApp.sendMessage(message)
    }
  });
}

ChatApp.connect();

// on load of page
$(function(){
  ChatApp.setupDOMListeners();
});  

