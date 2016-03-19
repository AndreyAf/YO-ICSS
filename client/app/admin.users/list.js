'use strict';

angular.module('icssApp').controller('AdminUsersListCtrl', adminUsersListCtrl);

function adminUsersListCtrl(UserSvc, uiGridConstants) {
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
        cellTemplate: "<img width=\"50px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>"
      },
      {
        name: '',
        field: '_id',
        enableFiltering: false,
        enableSorting: false,
        enableHiding: false,
        enableColumnMenu: false,
        cellTemplate: '' +
        '<span style="display:block; text-align:center;">' +
        ' <a href="" ui-sref="admin.users.edit({id:grid.getCellValue(row, col)})" class="btn btn-xs btn-default">' +
        '   <i class="fa fa-pencil"></i>' +
        ' </a>' +
        ' <a href="" ng-click="grid.appScope.deleteUser(grid.getCellValue(row, col))" class="btn btn-xs btn-default">' +
        '   <i class="fa fa-times"></i>' +
        ' </a>' +
        '</span>'
      }
    ]
  };

  vm.deleteUser = deleteUser;

  activate();

//////////

  function activate() {
    UserSvc.query().then(function (users) {
      vm.users = users;
      vm.gridOptions.data = users;
    });
  }

  function deleteUser(){
    if (confirm('Are You sure you want to delete this user')) {
      vm.loading = true;
      UserSvc.remove(id)
        .then(function () {
          vm.gridOptions.data = vm.gridOptions.data.filter(function (item) {
            return item._id !== id;
          });
        })
        .finally(function () {
          vm.loading = false;
        });
    }
  }
}
