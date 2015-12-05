'use strict';

angular.module('icssApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('chat', {
        title: 'Chat',
        url: '/chat',
        templateUrl: 'app/chat/chat.html',
        controller: 'ChatCtrl',
        roles: ['client','employee','admin','manager'],
        authenticate: true
      });
  })
  .run(function ($rootScope) {
    $rootScope.isFullscreen = false;
    $rootScope.showSidebar = true;

    $rootScope.currentChat = {
      session: {
        _id : '123123'
      },
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
