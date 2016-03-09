'use strict';

angular.module('icssApp').controller('AdminUsersListCtrl', adminUsersListCtrl);

function adminUsersListCtrl(UserSvc,uiGridConstants) {
  var vm = this;

  vm.users = [];
  vm.gridOptions = {
    data: [],
    enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
    enableFiltering: true,
    columnDefs: [
      {
        name: 'Name',
        field: 'name'
      }, {
        name: 'Status',
        field: 'status'
      },
      {
        name: 'User IMG',
        field: 'img',
        cellTemplate:"<img width=\"50px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>"
      }
    ]};

activate();

//////////

function activate() {
  UserSvc.query().then(function (users) {
    vm.users = users;
    vm.gridOptions.data = users;
  });
}
}
