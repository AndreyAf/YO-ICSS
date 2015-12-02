'use strict';

angular.module('icssApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('chat', {
        url: '/chat',
        templateUrl: 'app/chat/chat.html',
        controller: 'ChatCtrl',
        authenticate: true
      });
  })
  .run(function ($rootScope) {
    $rootScope.isFullscreen = false;
    $rootScope.showSidebar = true;

    $rootScope.currentChat = {
      user: null,
      messages: []
    };

    // TODO: get current user
    $rootScope.currentUser = {
      name: 'Israel Israeli',
      status: 'live',
      statusMsg: 'Hello world',
      img: 'assets/images/user.png'
    };
  });
