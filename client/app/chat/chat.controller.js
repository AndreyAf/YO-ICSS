'use strict';

angular.module('icssApp')
  .controller('ChatCtrl', ['$scope','$rootScope', function ($scope,$rootScope) {

    $scope.keyup = function(keyupEvent){

      // for other directive to listen
      $rootScope.$broadcast('keyup',keyupEvent);
    };
  }]);
