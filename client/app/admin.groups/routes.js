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
      '<ic-admin-panel-content title="\'Groups\'" create-title="\'Add new group\'" create-sref="\'admin.groups.create\'">' +
      ' <ic-loading is-loading="vm.loading"></ic-loading>'+
      ' <div ng-if="!vm.loading" class="admin-panel-grid" id="groupsGrid" ui-grid="vm.gridOptions" ui-grid-auto-resize></div>' +
      '</ic-admin-panel-content>',
      data: {pageTitle: 'Groups Panel - List'},
      controller: 'AdminGroupsListCtrl',
      controllerAs: 'vm',
      authenticate: true
    })
    .state({
      name: 'admin.groups.create',
      url: '/',
      templateUrl: 'app/admin.groups/model.html',
      data: {pageTitle: 'Groups Panel - Create'},
      controller: 'AdminGroupsModelCtrl',
      controllerAs: 'vm',
      authenticate: true
    })
    .state({
      name: 'admin.groups.edit',
      url: '/:id',
      templateUrl: 'app/admin.groups/model.html',
      data: {pageTitle: 'Groups Panel - Edit'},
      controller: 'AdminGroupsModelCtrl',
      controllerAs: 'vm',
      authenticate: true
    });
});
