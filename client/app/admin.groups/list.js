'use strict';

angular.module('icssApp').controller('AdminGroupsListCtrl', adminGroupsListCtrl);

/* @ngInject */
function adminGroupsListCtrl(GroupSvc, uiGridConstants, $state) {
  var vm = this;

  vm.deleteGroup = deleteGroup;
  vm.editGroup = editGroup;

  vm.groups = [];
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
        cellTemplate: '' +
        '<span style="display:block; text-align:center;">' +
        ' <button ng-click="grid.appScope.editGroup(grid.getCellValue(row, col))" class="btn btn-xs btn-default">' +
        '   <i class="fa fa-pencil"></i>' +
        ' </button>' +
        ' <button ng-click="grid.appScope.deleteGroup(grid.getCellValue(row, col))" class="btn btn-xs btn-default">' +
        '   <i class="fa fa-times"></i>' +
        ' </button>' +
        '</span>'
      }
    ]
  };

  activate();

  //////////

  function activate() {
    vm.loading = true;
    GroupSvc.query().then(function (groups) {
      vm.groups = groups;
      vm.gridOptions.data = groups;
    }).finally(function () {
      vm.loading = false;
    });
  }

  function deleteGroup(id) {
    if (confirm('Are You sure you want to delete this group')) {
      GroupSvc.remove(id);
    }
  }

  function editGroup(id) {
    $state.go('admin.groups.edit', {id: id});
  }
}
