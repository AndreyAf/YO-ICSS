'use strict';

angular.module('icssApp')
  .controller('ChatCtrl', ['$scope', '$rootScope', 'ciChatSvc', function ($scope, $rootScope, ciChatSvc) {

    $scope.currentChat = ciChatSvc.currentChat;

    $scope.state = ciChatSvc.getCurrentState();

    $scope.$watch('currentChat', function (newVal) {
      $scope.currentChat = newVal;
    });

    $scope.$watch(function () {
      return ciChatSvc.getCurrentState()
    }, function (newVal) {
      $scope.state = newVal;
    });

    $scope.keyup = function (keyupEvent) {

      // for other directive to listen
      $rootScope.$broadcast('keyup', keyupEvent);
    };
  }]);
