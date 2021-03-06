'use strict';

angular.module('icssApp').controller('AdminGroupsModelCtrl', adminGroupsModelCtrl);

/* @ngInject */
function adminGroupsModelCtrl(UserSvc, GroupSvc, $state, $q, $location) {
  var vm = this;

  vm.groupDefaultImgUrl = 'http://' + $location.host() + ':' + $location.port() + '/assets/images/group_default.jpg';

  vm.users = [];
  vm.usersOpt = [];
  vm.group = {
    name: null,
    description: null,
    logo_url: vm.groupDefaultImgUrl,
    users: []
  };

  vm.saveGroup = saveGroup;
  vm.addUser = addUser;
  vm.removeUser = removeUser;

  activate();

  //////////

  function activate() {
    vm.loading = true;

    var groupPromise = $state.params.id ? GroupSvc.getById($state.params.id) : $q.resolve(vm.group);

    $q.all([
      groupPromise,
      UserSvc.query()
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
    if (vm.group._id) {
      GroupSvc.addUser(vm.group._id, user._id)
        .then(function () {
          vm.group.users.push(user);
          filterUsers();
          vm.loadingNewUser = false;
        });
    }
    else {
      vm.group.users.push(user);
      filterUsers();
      vm.loadingNewUser = false;
    }
  }

  function removeUser(user) {
    user.loading = true;
    if (vm.group._id) {
      GroupSvc.removeUser(vm.group._id, user._id)
        .then(function () {
          var index = vm.group.users.indexOf(user);
          vm.group.users.splice(index, 1);
          filterUsers();
          user.loading = false;
        });
    }
    else {
      var index = vm.group.users.indexOf(user);
      vm.group.users.splice(index, 1);
      filterUsers();
      user.loading = false;
    }
  }
}
