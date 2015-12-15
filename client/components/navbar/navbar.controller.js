'use strict';

angular.module('icssApp')
  .controller('NavbarCtrl', function ($scope, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'state': 'main',
      'isVisible': true
    }, {
      'title': 'Chat',
      'state': 'chat',
      'isVisible': Auth.isAdmin()
      //,
      //'target': '_blank'
    }, {
      'title': 'Admin',
      'state': 'admin',
      'isVisible': Auth.isAdmin()
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;
  });
