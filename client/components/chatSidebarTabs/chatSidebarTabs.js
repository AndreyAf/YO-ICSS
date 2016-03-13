(function () {

  'use strict';

  angular.module('icssApp').directive('icSidebarTabs', function () {

    // @ngInject
    function icSidebarTabs(User, Auth, ciChatSvc) {
      var vm = this; //jshint ignore:line

      vm.users = User.query();
      vm.companies = [];
      vm.contacts = [];
      vm.groups = [];

      // Get current user contacts
      Auth.getCurrentUser(function (user) {
        vm.contacts = user.contacts;
        vm.groups = user.groups;
      });

      vm.changeState = function (state) {
        ciChatSvc.setCurrentState(state);
      };
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
