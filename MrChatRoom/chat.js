(function() {


  //variable
  var app     = require('express')(),
      server  = require('http').createServer(app),
      io      = require('socket.io').listen(server),
      ent     = require('ent'), 
      fs      = require('fs');

  //Load first page
  app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
  });

  //the realtime chat
  io.sockets.on('connection', function (socket, nickname) {

    //When someone enter in the chat, it gives a nickname, the app stock it and broadcast everyone
    socket.on('new_client', function (nickname) {
      console.log("new_client in server");
      nickname = ent.encode(nickname);
      socket.nickname = nickname;
      socket.broadcast.emit('new_client', nickname);
    });

    //when we add a message, the app take the pseudo and broadcast the msg to everyone
    socket.on('message', function (message) {
      message = ent.encode(message);
      socket.broadcast.emit('message', {nickname: socket.nickname, message: message});
    });
  });

  server.listen(8000);

})();
