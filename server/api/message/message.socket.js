'use strict';

var Message = require('./message.model');

exports.register = function (socket, socketio) {

  // Listens for new user
  socket.on('new user', function (data) {

    // User joins the session
    socket.join(data._session);

    // Tell all those in the session that a new user joined
    socketio.in(data._session).emit('user joined', data);
  });

  // TODO: support functionality
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
      _session: data._session,
      _sender: data._sender,
      content: data.content
    });

    // Save the new message
    newMsg.save().then(function (msg) {

      Message.findOne({ _id : msg._id })
        .populate('_sender')
        .exec(function (error, msg) {

          if (error) return console.log(error);

          // Send the message to those connected to the same session
          socketio.in(data._session).emit('message created', msg);

        });
    });
  });

  // Listens for a new chat message
  socket.on('typing new message', function (data) {

    // Send message to those connected in the same session
    socketio.in(data._session).emit('typing new message', data);
  });

};

