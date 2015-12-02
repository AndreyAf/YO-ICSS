(function () {

  'use strict';

  function ChatSvc(socketFactory, Message, $rootScope, Auth) {

    // TODO: rewrite server address
    var myIoSocket = io.connect('https://icss-yo-v1.herokuapp.com:3000');

    var socket = socketFactory({ioSocket: myIoSocket});

    var svc = {
      socket: socket,
      sendMessage: function (message, _session) {

        // Send message
        socket.emit('new message', {
          _session: _session,
          _sender: Auth.getCurrentUser()._id,
          content: message
        });
      }
    };

    return svc;
  }

  angular.module('icssApp').factory('ciChatSvc', ChatSvc);

})();
