/**
 * Socket.io configuration
 */

'use strict';

var config = require('./environment');

// When the user disconnects.. perform this
function onDisconnect(socket) {
}

// When the user connects.. perform this
function onConnect(socket, socketio) {
  // When the client emits 'info', this listens and executes
  socket.on('info', function (data) {
    socket.log(JSON.stringify(data, null, 2));
  });

  // Insert sockets below
  require('../api/session/session.socket').register(socket);
  require('../api/message/message.socket').register(socket, socketio);
}

module.exports = function (socketio) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // Authenticate socket.io users and access their token through socket.decoded_token
  socketio.use(require('socketio-jwt').authorize({
    secret: config.secrets.session,
    handshake: true
  }));

  socketio.on('connection', function (socket) {
    socket.address = socket.request.connection.remoteAddress +
      ':' + socket.request.connection.remotePort;

    socket.connectedAt = new Date();

    // Call onDisconnect.
    socket.on('disconnect', function () {
      onDisconnect(socket);
      console.log('DISCONNECTED');
    });

    // Call onConnect.
    onConnect(socket, socketio);

    console.log('CONNECTED');
  });
};
