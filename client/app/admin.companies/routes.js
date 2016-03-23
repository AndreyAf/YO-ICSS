'use strict';

angular.module('icssApp').config(function ($stateProvider) {

  $stateProvider
    .state({
      name: 'admin.companies',
      abstract: true,
      url: '/companies',
      views: {
        'content': {
          template: '<ui-view></ui-view>'
        }
      }
    })
    .state({
      name: 'admin.companies.list',
      url: '',
      template: '' +
      '<ic-admin-panel-content title="\'Companies\'" create-title="\'Add new company\'" create-sref="\'admin.companies.create\'"> ' +
      ' <ic-loading is-loading="vm.loading"></ic-loading>'+
      ' <div ng-if="!vm.loading" class="admin-panel-grid" id="companiesGrid" ui-grid="vm.gridOptions"></div> ' +
      '</ic-admin-panel-content>',
      data: {pageTitle: 'Companies Panel - List'},
      controller: 'AdminCompaniesListCtrl',
      controllerAs: 'vm',
      authenticate: true
    })
    .state({
      name: 'admin.companies.create',
      url: '/',
      templateUrl: 'app/admin.companies/model.html',
      data: {pageTitle: 'Companies Panel - Create'},
      controller: 'AdminCompanyModelCtrl',
      controllerAs: 'vm',
      authenticate: true
    })
    .state({
      name: 'admin.companies.edit',
      url: '/:id',
      templateUrl: 'app/admin.companies/model.html',
      data: {pageTitle: 'Companies Panel - Edit'},
      controller: 'AdminCompanyModelCtrl',
      controllerAs: 'vm',
      authenticate: true
    });
});
