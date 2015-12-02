(function () {

  'use strict';

  angular.module('icssApp').factory('ciChatSvc', ChatSvc);

  function ChatSvc(socketFactory, Message, $rootScope, Auth) {

    var myIoSocket = io.connect('http://localhost:3000');

    var socket = socketFactory({ioSocket: myIoSocket});

    var svc = {

      socket: socket,

      sendMessage: function (message) {
        // send message
        socket.emit('new message', {
          _session: $rootScope.currentChat.session._id,
          _sender: Auth.getCurrentUser()._id,
          content: message
        });

      },

      renewLogin: function () {
      }

    };

    return svc;
  }

})();
