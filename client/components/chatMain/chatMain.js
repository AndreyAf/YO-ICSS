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
    function icChatMain(ciChatSvc, $rootScope, Auth) {
      var vm = this; //jshint ignore:line

      vm.emojiMessage = {};

      vm.currentChat = $rootScope.currentChat;

      $rootScope.$watch('currentChat', function (newVal, oldVal) {
        vm.currentChat = newVal;
      });

      $rootScope.$on('keyup', function (event, data) {
        if (data == 13) {
          vm.sendMessage();
        }
      });

      ciChatSvc.socket.on('message created', function (data) {
        $rootScope.currentChat.messages.push(data);
      });

      vm.sendMessage = function () {

        // Add message to list
        $rootScope.currentChat.messages.push({
          content: vm.emojiMessage.messagetext,
          sent: new Date()
        });

        //var _session = $rootScope.currentChat.session._id;
        var _session = '123123';
        var _user = Auth.getCurrentUser();

        ciChatSvc.sendMessage(vm.emojiMessage.messagetext, _session, _user);

        vm.emojiMessage.messagetext = "";
        vm.emojiMessage.rawhtml = "";
      };

      vm.keyup = function (event) {
        console.log('keyup', event);
      };
    }
  });
})();
