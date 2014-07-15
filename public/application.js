var ChatApp = ChatApp || {};

ChatApp.connect = function() {
  this.socket = io.connect('/');
  this.setupSocketListeners();
};

ChatApp.setupSocketListeners = function() {
  // on connection to server, ask for user's name with an anonymous callback
  this.socket.on('connect', function() {
    // call the server-side function 'adduser' and send one parameter (value of prompt)
    ChatApp.socket.emit('adduser', ChatApp.username);
  });
}

ChatApp.connect();

