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

ChatApp.setupSocketListeners = function() {
  // on connection to server, ask for user's name with an anonymous callback
  this.socket.on('connect', function() {
    // call the server-side function 'adduser' and send one parameter (value of prompt)
    ChatApp.socket.emit('adduser', ChatApp.username);
  });

  // listener, whenever the server emits 'updateusers', this updates the username list
  this.socket.on('updateusers', function(users) {
    ChatApp.ui.refreshUsers(users)
  });
}

ChatApp.connect();
