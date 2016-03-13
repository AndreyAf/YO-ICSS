'use strict';

angular.module('icssApp').controller('AdminCompaniesListCtrl', adminCompaniesListCtrl);

function adminCompaniesListCtrl(CompanySvc, uiGridConstants) {
  var vm = this;

  vm.companies = [];
  vm.gridOptions = {
    data: [],
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
        name: 'Departments',
        field: 'departments',
        cellTemplate: "" +
        "<ul>" +
        "   <li ng-repeat='department in grid.getCellValue(row, col)'>{{department.name}}</li>" +
        "</ul>"
      }
    ]
  };

  activate();

//////////

  function activate() {
    CompanySvc.query().then(function (companies) {
      vm.companies = companies;
      vm.gridOptions.data = companies;
    });
  }
}
