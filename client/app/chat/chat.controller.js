'use strict';

angular.module('icssApp')
  .controller('ChatCtrl', ['$scope', 'ciChatSvc','$rootScope','User', function ($scope, ciChatSvc,$rootScope,User, socket) {

    $scope.users = User.query();

    $scope.companies = [];

    $scope.keyup = function(keyupEvent){

      $rootScope.$broadcast('keyup',keyupEvent);
    };
  }]);
