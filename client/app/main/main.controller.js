'use strict';
(function () {

  function MainController(Auth, $scope) {

    $scope.isLoggedIn = Auth.isLoggedIn;
  }

  angular.module('icssApp').controller('MainController', MainController);

})();
