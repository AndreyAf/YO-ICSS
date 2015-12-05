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
  .run(function ($rootScope,ciSessionSvc) {
    $rootScope.isFullscreen = false;
    $rootScope.showSidebar = true;

    // TODO: delete and put in service ciSessionSvc
    $rootScope.currentChat = {
      session: {
        _id : ciSessionSvc.getSession()._id
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
