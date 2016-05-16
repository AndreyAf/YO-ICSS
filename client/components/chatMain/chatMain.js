(function () {

  'use strict';

  angular.module('icssApp').directive('icChatMain', function () {
    //
    //// @ngInject
    //function icChatMain(ciChatSvc, $rootScope, Auth, $timeout, socket, ciSingleSessionSvc, $scope) {
    //  var vm = this; //jshint ignore:line
    //
    //  vm.message = null;
    //  vm.someoneTyping = {
    //    status: false,
    //    name: null
    //  };
    //  vm.isVideoChat = false;
    //  vm.currentChat = ciChatSvc.getCurrentChat();
    //
    //  vm.sendMessage = sendMessage;
    //
    //  // watch current chat changes
    //  $scope.$watch(function () {
    //    return ciChatSvc.getCurrentChat();
    //  }, function (newVal) {
    //    vm.currentChat = newVal;
    //  });
    //
    //  $rootScope.$on('keyup', function (event, data) {
    //
    //    if (ciSingleSessionSvc.getCurrentSession() != null) {
    //      // Send message
    //      socket.socket.emit('typing new message', {
    //        _session: ciSingleSessionSvc.getCurrentSession()._id,
    //        _sender: Auth.getCurrentUser()._id,
    //        sender_name: Auth.getCurrentUser().name
    //      });
    //
    //      // On enter pressed send message
    //      if (data === 13) {
    //        vm.sendMessage();
    //      }
    //    }
    //  });
    //
    //  vm.isCurrentUser = function (_id) {
    //    return Auth.getCurrentUser()._id === _id;
    //  };
    //
    //  /***
    //   * Listen to new message created
    //   */
    //  socket.socket.on('message created', function (message) {
    //
    //    ciChatSvc.addMessage(message);
    //
    //    // Refresh local data
    //    vm.currentChat = ciChatSvc.getCurrentChat();
    //
    //    $(".nano").nanoScroller({scrollBottom: 5});
    //  });
    //
    //  /***
    //   * Listen to typing
    //   */
    //  socket.socket.on('typing new message', function (data) {
    //    // timeout limited
    //    if (data._sender !== Auth.getCurrentUser()._id) {
    //
    //      vm.someoneTyping = {status: true, name: data.sender_name};
    //
    //      $timeout(function () {
    //        vm.someoneTyping = {status: false, name: null};
    //      }, 2000);
    //
    //    }
    //  });
    //
    //  /***
    //   * Send Message
    //   */
    //  function sendMessage() {
    //
    //    ciChatSvc.sendMessage(vm.message);
    //
    //    $(".nano").nanoScroller({scrollBottom: 5});
    //
    //    // reset message
    //    vm.message = '';
    //  }
    //}

    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'components/chatMain/chatMain.html',
      controllerAs: 'vm',
      controller: 'chatMainCtrl'
    };

  });
})();
