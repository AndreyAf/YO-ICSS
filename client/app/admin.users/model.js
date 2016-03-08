'use strict';

angular.module('icssApp').controller('AdminUsersModelCtrl', adminUsersModelCtrl);

function adminUsersModelCtrl(UserSvc, $state, $q) {
  var vm = this;

  var orgUser = null;

  vm.loading = true;
  vm.user = {
    name: null,
    status: null,
    password: null,
    email: null
  };

  vm.deleteUser = deleteUser;
  vm.addUser = addUser;
  vm.updateUser = updateUser;

  activate();

  //////////

  function activate() {

    var promise = $state.params.id ? UserSvc.getById($state.params.id) : $q.resolve();

    promise.then(function (user) {
      orgUser = user;
      vm.user = angular.copy(user);
    }).catch(function (err) {
      // TODO : add error handler
    }).finally(function () {
      vm.loading = false;
    });
  }

  function deleteUser(user) {

  }

  function addUser() {

  }

  function updateUser() {

  }
}
