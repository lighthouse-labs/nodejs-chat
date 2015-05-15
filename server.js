var express = require('express');
var _ = require('underscore');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server); // Set up websockets server along side our HTTP server

server.listen(process.env.PORT || 3000);

app.set('view engine', 'ejs');
app.set('view options', { layout: false });
app.use(express.methodOverride());
app.use(express.bodyParser());  
app.use(app.router);
app.use('/public', express.static('public'));

console.log("Server listening on port", process.env.PORT || 3000);

app.get('/', function (req, res) {
  res.render('index');
});

io.on('connection', function(socket) {
  // Runs for every client connected
  // Each client gets their own socket
  console.log('User connected to server');

  // handle incoming message
  socket.on('funky-server-message', function(data) {
    console.log('Message: ', data.message, 'from', data.username);
    setTimeout(function(){
      // send message to all clients
      // io.sockets.emit('incoming-message', data.message);

      // send message to all clients, EXCEPT the sender
      socket.broadcast.emit('incoming-message', data.message);

    }, 2000);
  });
});

