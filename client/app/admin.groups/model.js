'use strict';

angular.module('icssApp').controller('AdminGroupsModelCtrl', adminGroupsModelCtrl);

/* @ngInject */
function adminGroupsModelCtrl(GroupSvc, $state, $q) {
  var vm = this;

  vm.loading = true;
  vm.group = {
    name: null,
    description: null,
    logo_url: null
  };

  vm.saveGroup = saveGroup;

  activate();

  //////////

  function activate() {

    var promise = $state.params.id ? GroupSvc.getById($state.params.id) : $q.resolve();

    promise.then(function (group) {
      vm.group = group;
    }).catch(function (err) {
      // TODO : add error handler
    }).finally(function () {
      vm.loading = false;
    });
  }

  function saveGroup() {
    vm.loading = true;
    var promise = vm.group._id ? GroupSvc.update(vm.group): GroupSvc.create(vm.group);

    promise.then(function(){
      $state.go('admin.groups.list');
    });
  }
}
