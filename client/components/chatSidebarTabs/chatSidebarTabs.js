(function () {

  'use strict';

  angular.module('icssApp').directive('icSidebarTabs', function () {

    // @ngInject
    function icSidebarTabs(User) {
      var vm = this; //jshint ignore:line

      vm.users = User.query();
      vm.companies = [];
    }

    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'components/chatSidebarTabs/chatSidebarTabs.html',
      controllerAs: 'vm',
      controller: icSidebarTabs
    };

  });
})();
