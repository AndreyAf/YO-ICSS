(function () {

  'use strict';

  function ChatSvc(socketFactory, Auth, ciIoSvc, ciSessionSvc) {

    var ioSocket = ciIoSvc.connect('localhost:3000'),
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
