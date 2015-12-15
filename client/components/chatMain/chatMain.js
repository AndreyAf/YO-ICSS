(function () {

  'use strict';

  angular.module('icssApp').directive('icChatMain', function () {

    // @ngInject
    function icChatMain(ciChatSvc, $rootScope, Auth, $timeout, socket, $sce, VideoStream, $location, Room, ciSingleSessionSvc, $scope) {
      var vm = this; //jshint ignore:line

      vm.emojiMessage = {};

      vm.someoneTyping = {status: false, name: null};

      vm.isVideoChat = false;

      vm.currentChat = ciChatSvc.getCurrentChat();

      $scope.$watch(function () {
        return ciChatSvc.getCurrentChat();
      }, function (newVal) {

        vm.currentChat = newVal;
      });

      $rootScope.$on('keyup', function (event, data) {


        if(ciSingleSessionSvc.getCurrentSession() != null) {
          // Send message
          socket.socket.emit('typing new message', {
            _session: ciSingleSessionSvc.getCurrentSession()._id,
            _sender: Auth.getCurrentUser()._id,
            sender_name: Auth.getCurrentUser().name
          });

          // On enter pressed send message
          if (data === 13) {
            vm.sendMessage();
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

        ciChatSvc.sendMessage(vm.emojiMessage.messagetext);

        // TODO: rewrite - not the correct angular way
        $(".nano").nanoScroller({scrollBottom: 5});

        vm.emojiMessage.messagetext = '';
        vm.emojiMessage.rawhtml = '';
      };

      // #######################################
      // TESTING START
      // #######################################

      //var roomId = '123123123';
      //if (!window.RTCPeerConnection || !navigator.getUserMedia) {
      //  console.log('WebRTC is not supported by your browser. You can try the app with Chrome and Firefox.');
      //  return;
      //}
      //
      //var stream;
      //
      //VideoStream.get()
      //  .then(function (s) {
      //    stream = s;
      //    Room.init(stream);
      //    stream = URL.createObjectURL(stream);
      //    if (!roomId) {
      //      Room.createRoom()
      //        .then(function (roomId) {
      //          $location.path('/room/' + roomId);
      //        });
      //    } else {
      //      Room.joinRoom(roomId);
      //    }
      //  }, function () {
      //    console.log('No audio/video permissions. Please refresh your browser and allow the audio/video capturing.');
      //  });
      //vm.peers = [];
      //Room.on('peer.stream', function (peer) {
      //  console.log('Client connected, adding new stream');
      //  vm.peers.push({
      //    id: peer.id,
      //    stream: URL.createObjectURL(peer.stream)
      //  });
      //});
      //Room.on('peer.disconnected', function (peer) {
      //  console.log('Client disconnected, removing stream');
      //  vm.peers = vm.peers.filter(function (p) {
      //    return p.id !== peer.id;
      //  });
      //});
      //
      //vm.getLocalVideo = function () {
      //  return $sce.trustAsResourceUrl(stream);
      //};

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
