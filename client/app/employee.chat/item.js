'use strict';

angular.module('icssApp').controller('EmployeeChatCtrl', employeeChatCtrl);

/* @ngInject */
function employeeChatCtrl($rootScope, ciSingleSessionSvc, socket, Auth, ciChatSvc, $timeout) {
  var vm = this;

  vm.message = null;
  vm.someoneTyping = {
    status: false,
    name: null
  };

  vm.currentChat = {
    img: '',
    title: 'employee session',
    messages: []
  };

  // COMBINA :)

  ciChatSvc.setCurrentChat({
    _id: 123132,
    title: 'sample'
  });

  vm.sendMessage = sendMessage;
  vm.isCurrentUser = isCurrentUser;

  $rootScope.$on('keyup', function (event, data) {

    if (ciSingleSessionSvc.getCurrentSession() != null) {
      // Send message
      socket.socket.emit('typing new message', {
        _session: ciSingleSessionSvc.getCurrentSession(),
        _sender: Auth.getCurrentUser()._id,
        sender_name: Auth.getCurrentUser().name
      });

      // On enter pressed send message
      if (data === 13) {
        if (vm.message) {
          sendMessage();
        }
      }
    }
  });

  /***
   * Listen to new message created
   */
  socket.socket.on('message created', function (message) {

    ciChatSvc.addMessage(message);

    // Refresh local data
    vm.currentChat = ciChatSvc.getCurrentChat();
  });

  /***
   * Listen to typing
   */
  socket.socket.on('typing new message', function (data) {
    // timeout limited
    if (data._sender !== Auth.getCurrentUser()._id) {

      vm.someoneTyping = {status: true, name: data.sender_name};

      $timeout(function () {
        vm.someoneTyping = {status: false, name: null};
      }, 2000);

    }
  });

  ////////

  function sendMessage() {
    if (vm.message) {

      ciChatSvc.sendMessage(vm.message);

      // TODO: rewrite - not the correct angular way
      $(".nano").nanoScroller({scrollBottom: 5});

      vm.message = '';
    }
  }

  function isCurrentUser(_id) {
    return Auth.getCurrentUser()._id === _id;
  }

}
