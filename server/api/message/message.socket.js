/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var MessageEvents = require('./message.events');
var Message = require('./message.model');

// Model events to emit
var events = ['save', 'remove'];

exports.register = function(socket,socketio) {

  // Listens for new user
  socket.on('new user', function (data) {

    // TODO: get or create session
    data._session = '123123';

    // New user joins the session
    socket.join(data._session);

    // Tell all those in the session that a new user joined
    socketio.in(data._session).emit('user joined', data);
  });

  //Listens for switch room
  socket.on('switch room', function (data) {

    // Handles joining and leaving rooms
    socket.leave(data._oldSession);
    socket.join(data._newSession);

    socketio.in(data._oldSession).emit('user left', data);
    socketio.in(data._newSession).emit('user joined', data);
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
        socketio.in(data._session).emit('message created', msg);
      });
  });

  // Listens for a new chat message
  socket.on('typing new message', function (data) {

    // Send message to those connected in the same session
    socketio.in(data._session).emit('typing new message', data);
  });

};

