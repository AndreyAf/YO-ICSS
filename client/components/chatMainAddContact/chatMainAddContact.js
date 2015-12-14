(function () {

  'use strict';

  angular.module('icssApp').directive('icChatMainAddContact', function () {

    // @ngInject
    function icChatMainAddContact(User, lodash, Auth) {
      var vm = this; //jshint ignore:line

      vm.loading = false;
      vm.search = "";
      vm.users = [];

      vm.addContact = function (contact) {

        vm.loading = true;

        Auth.addContact(contact, function () {

          // Remove contact from users list
          vm.users = lodash.remove(vm.users, function(user) {
            return user._id != contact._id;
          });

          vm.loading = false;
        });
      };

      // Get users
      var getUsers = function () {
        vm.loading = true;
        Auth.getPossibleContacts(function (users) {
          vm.users = users;
        })
      };

      getUsers();
    }

    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'components/chatMainAddContact/chatMainAddContact.html',
      controllerAs: 'vm',
      controller: icChatMainAddContact
    };

  });
})();
