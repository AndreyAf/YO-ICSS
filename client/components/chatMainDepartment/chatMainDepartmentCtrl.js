(function () {

  'use strict';

  angular.module('icssApp').controller('chatMainDepartmentCtrl', chatMainDepartmentCtrl);

  // @ngInject
  function chatMainDepartmentCtrl(currentCompany, currentDepartmentId, Auth, ciChatSvc, ciSingleSessionSvc, socket, $rootScope, $timeout) {
    var vm = this; //jshint ignore:line

    vm.currentCompany = currentCompany;
    vm.currentDepartmentId = currentDepartmentId;
    vm.currentDepartment = null;
    vm.someoneTyping = {
      status: false,
      name: null
    };
    vm.currentChat = {
      messages: []
    };

    // todo : reset rewrite
    ciChatSvc.setCurrentChat({
      _id: 123132,
      title: 'sample'
    });

    vm.clearMsg = clearMsg;
    vm.sendMessage = sendMessage;
    vm.isCurrentUser = isCurrentUser;

    activate();

    //////////

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
            vm.sendMessage();
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

    function activate() {
      for (var i = 0; i < vm.currentCompany.departments.length; i++) {
        if (vm.currentCompany.departments[i]._id === currentDepartmentId) {
          vm.currentDepartment = vm.currentCompany.departments[i];
        }
      }
    }

    function clearMsg() {
      vm.currentChat.messages.length = 0;
    }

    function isCurrentUser(_id) {
      return Auth.getCurrentUser()._id === _id;
    }

    function sendMessage() {

      if (vm.message) {

        ciChatSvc.sendMessage(vm.message);

        // TODO: rewrite - not the correct angular way
        $(".nano").nanoScroller({scrollBottom: 5});

        vm.message = '';
      }
    }
  }
})();
