(function () {

  'use strict';

  angular.module('icssApp').directive('icChatMain', function () {

    // @ngInject
    function icChatMain(ciChatSvc, $rootScope, Auth, $timeout,$sce, VideoStream, $location, Room) {
      var vm = this; //jshint ignore:line

      vm.emojiMessage = {};

      vm.isTyping = false;
      vm.isVideoChat = false;

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
        if (data === 13) {
          vm.sendMessage();
        }
      });

      vm.isCurrentUser = function (_id) {
        return Auth.getCurrentUser()._id === _id;
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
        if (data._sender !== Auth.getCurrentUser()._id) {

          vm.isTyping = true;

          $timeout(function () {
            vm.isTyping = false;
          }, 1000);

        }
      });

      vm.sendMessage = function () {

        var _session = '123123';

        ciChatSvc.sendMessage(vm.emojiMessage.messagetext, _session);

        // TODO: rewrite - not the correct angular way
        $(".nano").nanoScroller({scrollBottom: 5});

        vm.emojiMessage.messagetext = '';
        vm.emojiMessage.rawhtml = '';
      };

      // #######################################
      // TESTING START
      // #######################################

      var roomId = '123123123';
      if (!window.RTCPeerConnection || !navigator.getUserMedia) {
        console.log('WebRTC is not supported by your browser. You can try the app with Chrome and Firefox.');
        return;
      }

      var stream;

      VideoStream.get()
        .then(function (s) {
          stream = s;
          Room.init(stream);
          stream = URL.createObjectURL(stream);
          if (!roomId) {
            Room.createRoom()
              .then(function (roomId) {
                $location.path('/room/' + roomId);
              });
          } else {
            Room.joinRoom(roomId);
          }
        }, function () {
          console.log('No audio/video permissions. Please refresh your browser and allow the audio/video capturing.');
        });
      vm.peers = [];
      Room.on('peer.stream', function (peer) {
        console.log('Client connected, adding new stream');
        vm.peers.push({
          id: peer.id,
          stream: URL.createObjectURL(peer.stream)
        });
      });
      Room.on('peer.disconnected', function (peer) {
        console.log('Client disconnected, removing stream');
        vm.peers = vm.peers.filter(function (p) {
          return p.id !== peer.id;
        });
      });

      vm.getLocalVideo = function () {
        return $sce.trustAsResourceUrl(stream);
      };

      // #######################################
      // TESTING END
      // #######################################

    }

    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'components/chatMain/chatMain.html',
      controllerAs: 'vm',
      controller: icChatMain
    };

  });
})();
