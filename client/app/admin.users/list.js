'use strict';

angular.module('icssApp').controller('AdminUsersListCtrl', adminUsersListCtrl);

function adminUsersListCtrl(UserSvc) {
  var vm = this;

  vm.users = [];

  activate();

  //////////

  function activate() {
    UserSvc.query().then(function (users) {
      vm.users = users;
    });
  }
}
