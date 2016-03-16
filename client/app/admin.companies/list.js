'use strict';

angular.module('icssApp').controller('AdminCompaniesListCtrl', adminCompaniesListCtrl);

/* @ngInject */
function adminCompaniesListCtrl(CompanySvc, uiGridConstants, $state) {
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
      }, {
        name: 'Slogan',
        field: 'slogan'
      },
      {
        name: 'Logo',
        field: 'logo_url',
        cellTemplate: "<img width=\"50px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>"
      },
      {
        name: 'Departments Num',
        field: 'departments',
        cellTemplate: "<p class='text-center' ng-bind='grid.getCellValue(row, col).length'></p>"
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
        ' <a href="" ui-sref="admin.companies.edit({id:grid.getCellValue(row, col)})" class="btn btn-xs btn-default">' +
        '   <i class="fa fa-pencil"></i>' +
        ' </a>' +
        ' <button ng-click="grid.appScope.deleteCompany(grid.getCellValue(row, col))" class="btn btn-xs btn-default">' +
        '   <i class="fa fa-times"></i>' +
        ' </button>' +
        '</span>'
      }
    ]
  };

  vm.deleteCompany = deleteCompany;

  activate();

  //////////

  function activate() {
    vm.loading = true;
    // TODO: get my companies
    CompanySvc.query()
      .then(function (companies) {
        vm.gridOptions.data = companies;
      })
      .finally(function () {
        vm.loading = false;
      });
  }

  function deleteCompany(id) {
    if (confirm('Are You sure you want to delete this company')) {
      vm.loading = true;
      CompanySvc.remove(id)
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
