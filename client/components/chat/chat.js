(function () {

  'use strict';

  function ChatSvc(socketFactory, Auth, ciIoSvc, ciSessionSvc) {

    //var ioSocket = ciIoSvc.connect('ws://chat-rape.herokuapp.com:3000'),
    var ioSocket = ciIoSvc.connect('wss://chat-rape.herokuapp.com/'),
      socket = socketFactory({ioSocket: ioSocket});

    return {
      socket: socket,
      sendMessage: function (message) {

        // Send message
        socket.emit('new message', {
          _session: ciSessionSvc.getSession()._id,
          _sender: Auth.getCurrentUser(null)._id,
          content: message
        });

      }
    };
  }

  angular.module('icssApp').factory('ciChatSvc', ChatSvc);

})();
