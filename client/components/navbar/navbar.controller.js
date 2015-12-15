'use strict';

angular.module('icssApp')
  .controller('NavbarCtrl', function ($scope, Auth, $location) {

    $scope.location = $location;

    $scope.menu = [{
      'title': 'Home',
      'state': 'main',
      'isVisible': true
    },{
      'title': 'Services',
      'isVisible': true,
      'elementId': 'services'
    },{
      'title': 'About us',
      'isVisible': true,
      'elementId': 'about_us'
    },{
      'title': 'Contact us',
      'isVisible': true,
      'elementId': 'contact_us'
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
