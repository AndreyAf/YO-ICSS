(function () {

  'use strict';

  function ChatSvc(socket, Auth) {

    var svc = {
      socket: socket.socket,
      sendMessage: function (message, _session) {

        // Send message
        socket.socket.emit('new message', {
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
