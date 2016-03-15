'use strict';

angular.module('icssApp').controller('AdminGroupsModelCtrl', adminGroupsModelCtrl);

/* @ngInject */
function adminGroupsModelCtrl(UserSvc, GroupSvc, $state, $q) {
  var vm = this;

  vm.loading = true;
  vm.users = [];
  vm.usersOpt = [];
  vm.group = {
    name: null,
    description: null,
    logo_url: null,
    users: []
  };

  vm.saveGroup = saveGroup;
  vm.addUser = addUser;
  vm.removeUser = removeUser;

  activate();

  //////////

  function activate() {

    var groupPromise = $state.params.id ? GroupSvc.getById($state.params.id) : $q.resolve(vm.group);
    var usersPromise = UserSvc.query();

    $q.all([
      groupPromise,
      usersPromise
    ]).then(function (data) {
      vm.group = data[0];
      vm.users = data[1];
      filterUsers();
    }).catch(function (err) {
      // TODO : add error handler
    }).finally(function () {
      vm.loading = false;
    });
  }

  function filterUsers() {
    vm.usersOpt = vm.users.filter(function (item) {
      for (var i = 0; i < vm.group.users.length; i++) {
        if (item._id === vm.group.users[i]._id) {
          return false;
        }
      }
      return true;
    });
  }

  function saveGroup() {
    vm.loading = true;
    var promise = vm.group._id ? GroupSvc.update(vm.group) : GroupSvc.create(vm.group);

    promise.then(function () {
      $state.go('admin.groups.list');
    });
  }

  function addUser(user) {
    vm.loadingNewUser = true;
    GroupSvc.addUser(vm.group._id, user._id)
      .then(function () {
        vm.group.users.push(user);
        filterUsers();
        vm.loadingNewUser = false;
      });
  }

  function removeUser(user) {
    user.loading = true;
    GroupSvc.removeUser(vm.group._id, user._id)
      .then(function () {
        var index = vm.group.users.indexOf(user);
        vm.group.users.splice(index, 1);
        filterUsers();
      });
  }
}
