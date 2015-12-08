'use strict';

var express = require('express'),
  controller = require('./message.controller'),
  http = require('http').Server(express),
  io = require('socket.io')(http),
  Message = require('./message.model'),
  router = express.Router(),
  port = 8080;

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

io.on('connection', function (socket) {
  io.set('transports', ['xhr-polling']);
  io.set('polling duration', 10);

  // Listens for new user
  socket.on('new user', function (data) {

    // TODO: get or create session
    data._session = '123123';

    // New user joins the session
    socket.join(data._session);

    // Tell all those in the session that a new user joined
    io.in(data._session).emit('user joined', data);
  });

  //Listens for switch room
  socket.on('switch room', function (data) {

    // Handles joining and leaving rooms
    socket.leave(data._oldSession);
    socket.join(data._newSession);

    io.in(data._oldSession).emit('user left', data);
    io.in(data._newSession).emit('user joined', data);
  });

  // Listens for a new chat message
  socket.on('new message', function (data) {

    var newMsg = new Message({
      content: data.content,
      _sender: data._sender,
      _session: data._session
    });
    newMsg.save()
      .then(function (msg) {
        console.log(msg);

        // Send message to those connected in the same session
        io.in(data._session).emit('message created', msg);
      });
  });

  // Listens for a new chat message
  socket.on('typing new message', function (data) {

    // Send message to those connected in the same session
    io.in(data._session).emit('typing new message', data);
  });

});

http.listen(port);

module.exports = router;
