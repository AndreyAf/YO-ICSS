(function () {

  'use strict';

  angular.module('icssApp').directive('icSidebarTabs', function () {

    // @ngInject
    function icSidebarTabs(User, Auth) {
      var vm = this; //jshint ignore:line

      vm.users = [];
      vm.companies = [];
      vm.contacts = [];
      vm.groups = [];

      activate();

      /////////

      function activate(){
        vm.users = User.query();

        // Get current user contacts
        Auth.getCurrentUser(function (user) {
          vm.contacts = user.contacts;
          vm.groups = user.groups;
          vm.companies = user.companies;
        });
      }
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
