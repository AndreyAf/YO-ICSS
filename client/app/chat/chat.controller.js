'use strict';

angular.module('icssApp')
  .controller('ChatCtrl', ['$scope', 'ciChatSvc','$rootScope','User', function ($scope, ciChatSvc,$rootScope,User) {

    //$scope.users = ciChatSvc.getPrivateChats();

    $scope.users = User.query();

    $scope.companies = ciChatSvc.getCompaniesChats();
    $scope.keyup = function(keyupEvent){

      $rootScope.$broadcast('keyup',keyupEvent);
    };

  }]);
