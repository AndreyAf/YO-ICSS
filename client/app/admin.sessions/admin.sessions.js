'use strict';

angular.module('icssApp').config(function($stateProvider) {
    $stateProvider
      .state('admin.sessions', {
        url: '/sessions',
        views: {
          "content" : {
            templateUrl: 'app/admin.sessions/admin.sessions.html',
            controller: 'AdminSessionsCtrl'
          }
        }
      });
  });
