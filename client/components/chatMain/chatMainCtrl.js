(function () {
  'use strict';

  angular.module('icssApp').controller('chatMainCtrl', chatMainCtrl);

  /* @ngInject  */
  function chatMainCtrl(ciChatSvc, $rootScope, Auth, $timeout, socket, ciSingleSessionSvc, currentChatType) {
    var vm = this; //jshint ignore:line

    vm.message = null;
    vm.someoneTyping = {
      status: false,
      name: null
    };
    vm.isVideoChat = false;
    vm.currentChat = ciChatSvc.getCurrentChat();

    console.log(currentChatType);

    ciChatSvc.setCurrentChat(currentChatType);

    $rootScope.$on('keyup', function (event, data) {

      if (ciSingleSessionSvc.getCurrentSession() != null) {
        // Send message
        socket.socket.emit('typing new message', {
          _session: ciSingleSessionSvc.getCurrentSession()._id,
          _sender: Auth.getCurrentUser()._id,
          sender_name: Auth.getCurrentUser().name
        });

        // On enter pressed send message
        if (data === 13) {
          if (vm.message) {
            vm.sendMessage();
          }
        }
      }
    });

    vm.isCurrentUser = function (_id) {
      return Auth.getCurrentUser()._id === _id;
    };

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

    vm.sendMessage = function () {

      if (vm.message) {

        ciChatSvc.sendMessage(vm.message);

        // TODO: rewrite - not the correct angular way
        $(".nano").nanoScroller({scrollBottom: 5});

        vm.message = '';
      }
    };
  }
})();
