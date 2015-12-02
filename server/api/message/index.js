'use strict';

var express = require('express');
var controller = require('./message.controller');
var http = require('http').Server(express);
var io = require('socket.io')(http);

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

io.on('connection', function(socket) {


  // Listens for new user
  socket.on('new user', function(data) {

    // TODO: get or create session
    data._session = '123';

    // New user joins the session
    socket.join(data._session);

    // Tell all those in the session that a new user joined
    io.in(data._session).emit('user joined', data);
  });

  //Listens for switch room
  socket.on('switch room', function(data) {

    // Handles joining and leaving rooms
    socket.leave(data._oldSession);
    socket.join(data._newSession);

    io.in(data._oldSession).emit('user left', data);
    io.in(data._newSession).emit('user joined', data);
  });

  // Listens for a new chat message
  socket.on('new message', function(data) {

    // Create message
    var newMsg = new Message({
      content: data.content,
      _sender: data._sender,
      _session: data._session
    });

    // Save it to DB
    newMsg.save(function(err, msg){

      // Send message to those connected in the session
      io.in(msg._session).emit('message created', msg);
    });

  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

module.exports = router;
