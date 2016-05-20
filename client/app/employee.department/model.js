'use strict';

angular.module('icssApp').controller('AdminUsersModelCtrl', adminUsersModelCtrl);

function adminUsersModelCtrl(UserSvc, $state, $q) {
  var vm = this;

  vm.loading = true;
  vm.user = {
    name: null,
    status: null,
    password: null,
    email: null
  };

  vm.saveUser = saveUser;

  activate();

  //////////

  function activate() {

    var promise = $state.params.id ? UserSvc.getById($state.params.id) : $q.resolve();

    promise.then(function (user) {
      vm.user = user;
    }).catch(function () {
      vm.loading = false;
      $state.go('admin.users.list');
    }).finally(function () {
      vm.loading = false;
    });
  }

  function saveUser() {
    vm.loading = true;
    var promise = vm.user._id ? UserSvc.update(vm.user) : UserSvc.create(vm.user);

    promise.then(function () {
      $state.go('admin.users.list');
    });
  }
}
