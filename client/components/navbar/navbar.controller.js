'use strict';

angular.module('icssApp')
  .controller('NavbarCtrl', function ($scope, Auth, $location) {

    $scope.location = $location;

    var isAdmin = Auth.isAdmin();

    var menuItems = [{
      'title': 'Home',
      'state': 'main',
      'isVisible': true
    },{
      'title': 'Services',
      'isVisible': true,
      'elementId': 'services'
    },{
      'title': 'Technology',
      'isVisible': true,
      'elementId': 'technology'
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
      'isVisible': isAdmin
      //,
      //'target': '_blank'
    }, {
      'title': 'Admin',
      'state': 'admin',
      'isVisible': isAdmin
    }];

    $scope.menu = menuItems;

    $scope.$watch(function(){return Auth.isAdmin();},function(){
      isAdmin = Auth.isAdmin();
      $scope.menu = menuItems;
    });

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;
  });
