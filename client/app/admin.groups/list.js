'use strict';

angular.module('icssApp').controller('AdminGroupsListCtrl', adminGroupsListCtrl);

/* @ngInject */
function adminGroupsListCtrl(GroupSvc, uiGridConstants) {
  var vm = this;

  vm.gridOptions = {
    data: [],
    appScopeProvider: vm,
    enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
    enableFiltering: true,
    columnDefs: [
      {
        name: 'Name',
        field: 'name'
      },
      {
        name: 'Description',
        field: 'description'
      },
      {
        enableFiltering: false,
        enableSorting: false,
        name: 'Logo',
        field: 'logo_url',
        cellTemplate: "<img width=\"50px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>"
      },
      {
        name: 'Users num',
        field: 'users',
        cellTemplate: "<p>{{(grid.getCellValue(row, col)).length}}</p>"
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
        ' <a href="" ui-sref="admin.groups.edit({id:grid.getCellValue(row, col)})" class="btn btn-xs btn-default">' +
        '   <i class="fa fa-pencil"></i>' +
        ' </a>' +
        ' <a href="" ng-click="grid.appScope.deleteGroup(grid.getCellValue(row, col))" class="btn btn-xs btn-default">' +
        '   <i class="fa fa-times"></i>' +
        ' </a>' +
        '</span>'
      }
    ]
  };

  vm.deleteGroup = deleteGroup;

  activate();

  //////////

  function activate() {
    vm.loading = true;
    GroupSvc.query()
      .then(function (groups) {
        vm.gridOptions.data = groups;
      })
      .finally(function () {
        vm.loading = false;
      });
  }

  function deleteGroup(id) {
    if (confirm('Are You sure you want to delete this group')) {
      vm.loading = true;
      GroupSvc.remove(id).then(function () {
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
