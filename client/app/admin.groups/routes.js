'use strict';

angular.module('icssApp').config(function ($stateProvider) {

  $stateProvider
    .state({
      name: 'admin.groups',
      abstract: true,
      url: '/groups',
      views: {
        'content': {
          template: '<ui-view></ui-view>'
        }
      }
    })
    .state({
      name: 'admin.groups.list',
      url: '',
      template: '' +
      '<ic-admin-panel-content title="\'Groups\'" create-title="\'Add new group\'" create-sref="\'admin.groups.create\'"> ' +
      ' <div class="admin-panel-grid" id="groupsGrid" ui-grid="vm.gridOptions"></div> ' +
      '</ic-admin-panel-content>',
      data: {pageTitle: 'Groups Panel - List'},
      controller: 'AdminGroupsListCtrl',
      controllerAs: 'vm'
    })
    .state({
      name: 'admin.groups.create',
      url: '/',
      templateUrl: 'app/admin.groups/model.html',
      data: {pageTitle: 'Groups Panel - Create'},
      controller: 'AdminGroupsModelCtrl',
      controllerAs: 'vm'
    })
    .state({
      name: 'admin.groups.edit',
      url: '/:id',
      templateUrl: 'app/admin.groups/model.html',
      data: {pageTitle: 'Groups Panel - Edit'},
      controller: 'AdminGroupsModelCtrl',
      controllerAs: 'vm'
    });
});
