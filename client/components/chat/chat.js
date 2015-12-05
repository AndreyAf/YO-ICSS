(function () {

  'use strict';

  function ChatSvc(socketFactory, Message, $rootScope, Auth, ciIoSvc, ciSessionSvc) {

    // TODO: rewrite server address
    //var myIoSocket = io.connect('https://icss-yo-v1.herokuapp.com:3000');
    var myIoSocket = ciIoSvc.connect('https://chat-rape.herokuapp.com:3000');

    var socket = socketFactory({ioSocket: myIoSocket});

    var svc = {
      socket: socket,
      sendMessage: function (message) {

        // Send message
        socket.emit('new message', {
          _session: ciSessionSvc.getSession()._id,
          _sender: Auth.getCurrentUser()._id,
          content: message
        });
      }
    };

    return svc;
  }

  angular.module('icssApp').factory('ciChatSvc', ChatSvc);

})();
