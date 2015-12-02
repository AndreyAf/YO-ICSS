(function () {

  'use strict';

  angular.module('icssApp').directive('icChatMain', function () {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'components/chatMain/chatMain.html',
      controllerAs: 'vm',
      controller: icChatMain
    };

    // @ngInject
    function icChatMain(ciChatSvc, $rootScope, Auth, $timeout) {
      var vm = this; //jshint ignore:line

      vm.emojiMessage = {};

      vm.isTyping = false;

      vm.currentChat = $rootScope.currentChat;

      $rootScope.$watch('currentChat', function (newVal, oldVal) {
        vm.currentChat = newVal;
      });

      $rootScope.$on('keyup', function (event, data) {

        // Send message
        ciChatSvc.socket.emit('typing new message', {
          _session: '123123',
          _sender: Auth.getCurrentUser()._id
        });

        // On enter pressed send message
        if (data == 13) {
          vm.sendMessage();
        }
      });

      vm.isCurrentUser = function(_id){
        return Auth.getCurrentUser()._id == _id;
      };

      /***
       * Listen to new message created
       */
      ciChatSvc.socket.on('message created', function (data) {
        $rootScope.currentChat.messages.push(data);
      });

      /***
       * Listen to typing
       */
      ciChatSvc.socket.on('typing new message', function (data) {
        // timeout limited
        if(data._sender != Auth.getCurrentUser()._id){

          vm.isTyping = true;

          $timeout(function() {
            vm.isTyping = false;
          }, 1000);

        }
      });

      vm.sendMessage = function () {

        var _session = '123123';

        ciChatSvc.sendMessage(vm.emojiMessage.messagetext, _session);

        vm.emojiMessage.messagetext = "";
        vm.emojiMessage.rawhtml = "";
      };
    }

  });
})();
