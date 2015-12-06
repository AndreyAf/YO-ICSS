'use strict';

var express = require('express');
var app = express();
var controller = require('./message.controller');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var Message = require('./message.model');
var port =  process.env.PORT || 3000;
var router = express.Router();

app.use(express.static(__dirname + '/public'));

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

io.on('connection', function (socket) {


  // Listens for new user
  socket.on('new user', function (data) {

    // TODO: get or create session
    data._session = '123123123';

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


  ////////// START
  //var rooms = {},
  //  userIds = {},
  //  currentRoom, id;
  //
  //socket.on('init', function (data, fn) {
  //
  //
  //  currentRoom = (data || {}).room || uuid.v4();
  //
  //  var room = rooms[currentRoom];
  //
  //  if (!data) {
  //
  //    rooms[currentRoom] = [socket];
  //
  //    id = userIds[currentRoom] = 0;
  //
  //    fn(currentRoom, id);
  //
  //    console.log('Room created, with #', currentRoom);
  //
  //  } else {
  //
  //    if (!room) {
  //      return;
  //    }
  //
  //    userIds[currentRoom] += 1;
  //
  //    id = userIds[currentRoom];
  //
  //    fn(currentRoom, id);
  //
  //    room.forEach(function (s) {
  //      s.emit('peer.connected', { id: id });
  //    });
  //
  //    room[id] = socket;
  //
  //    console.log('Peer connected to room', currentRoom, 'with #', id);
  //  }
  //});
  //
  //socket.on('msg', function (data) {
  //  var to = parseInt(data.to, 10);
  //  if (rooms[currentRoom] && rooms[currentRoom][to]) {
  //    console.log('Redirecting message to', to, 'by', data.by);
  //    rooms[currentRoom][to].emit('msg', data);
  //  } else {
  //    console.warn('Invalid user');
  //  }
  //});
  //
  //socket.on('disconnect', function () {
  //  if (!currentRoom || !rooms[currentRoom]) {
  //    return;
  //  }
  //  delete rooms[currentRoom][rooms[currentRoom].indexOf(socket)];
  //  rooms[currentRoom].forEach(function (socket) {
  //    if (socket) {
  //      socket.emit('peer.disconnected', { id: id });
  //    }
  //  });
  //});
  //
  ///////// END

});

http.listen(port);

module.exports = router;
