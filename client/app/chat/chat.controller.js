'use strict';

angular.module('icssApp')
  .controller('ChatCtrl', ['$scope', 'ciChatSvc','$rootScope','User', function ($scope, ciChatSvc,$rootScope,User, socket) {

    $scope.users = User.query();

    $scope.companies = ciChatSvc.getCompaniesChats();

    $scope.keyup = function(keyupEvent){

      $rootScope.$broadcast('keyup',keyupEvent);
    };

    socket.on('user joined', function (data) {

      // set current chat session token
      $rootScope.currentChat._session = data._session;

      console.log(data.name + ' has joined session '+ data.session);

    });

    socket.on('setup', function (data) {

      // get available sessions for current user
      $scope.sessions = data.sessions;

      console.log('Users sessions '+ data.sessions);
    });

    socket.on('message created', function (data) {
      $rootScope.currentChat.messages.push(data);
    });

  }]);
