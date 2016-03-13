'use strict';

angular.module('icssApp').controller('AdminGroupsModelCtrl', adminGroupsModelCtrl);

function adminGroupsModelCtrl(GroupSvc, $state, $q) {
  var vm = this;

  var orgGroup = null;

  vm.loading = true;
  vm.group = {
    name: null,
    description: null,
    logo_url: null
  };

  vm.deleteGroup = deleteGroup;
  vm.addGroup = addGroup;
  vm.updateGroup = updateGroup;

  activate();

  //////////

  function activate() {

    var promise = $state.params.id ? GroupSvc.getById($state.params.id) : $q.resolve();

    promise.then(function (group) {
      orgGroup = group;
      vm.group = angular.copy(group);
    }).catch(function (err) {
      // TODO : add error handler
    }).finally(function () {
      vm.loading = false;
    });
  }

  function deleteGroup(group) {

  }

  function addGroup() {

  }

  function updateGroup() {

  }
}
