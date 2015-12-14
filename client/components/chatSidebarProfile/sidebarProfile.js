(function () {

  'use strict';

  angular.module('icssApp').directive('icSidebarProfile', function () {

    // @ngInject
    function icSidebarProfile(Auth, $rootScope, ciChatSvc) {
      var vm = this; //jshint ignore:line

      vm.user = Auth.getCurrentUser();
      vm.isFullscreen = $rootScope.isFullscreen;

      vm.setFullScreenStatus = function () {
        $rootScope.isFullscreen = !$rootScope.isFullscreen;
        vm.isFullscreen = $rootScope.isFullscreen;
      };

      vm.changeState = function(state){
        ciChatSvc.setCurrentState(state);
      };
    }

    return {
      restrict: 'E',
      templateUrl: 'components/chatSidebarProfile/sidebarProfile.html',
      controllerAs: 'vm',
      controller: icSidebarProfile
    };

  });
})();
