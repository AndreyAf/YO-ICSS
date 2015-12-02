(function () {

  'use strict';

  angular.module('icssApp').factory('ciChatSvc', ChatSvc);

  function ChatSvc(socketFactory, Message, $rootScope, Auth) {

    var myIoSocket = io.connect('http://localhost:3000');

    var socket = socketFactory({ioSocket: myIoSocket});

    var svc = {

      socket: socket,

      sendMessage: function (message, _session, _user) {
        // send message
        socket.emit('new message', {
          _session: _session,
          _sender: _user,
          content: message
        });

      },

      renewLogin: function () {
      }

    };

    return svc;
  }

})();
