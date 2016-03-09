'use strict';

angular.module('icssApp').config(function ($stateProvider) {

  $stateProvider
    .state({
      name: 'admin.users',
      abstract: true,
      url: '/users',
      views: {
        'content': {
          template: '<ui-view></ui-view>'
        }
      }
    })
    .state({
      name: 'admin.users.list',
      url: '',
      template: '' +
      '<ic-admin-panel-content title="\'Users\'" create-title="\'Add new user\'" create-sref="\'admin.users.create\'"> ' +
      ' <div class="admin-panel-grid" id="usersGrid" ui-grid="vm.gridOptions"></div> ' +
      '</ic-admin-panel-content>',
      data: {pageTitle: 'Users Panel - List'},
      controller: 'AdminUsersListCtrl',
      controllerAs: 'vm'
    })
    .state({
      name: 'admin.users.create',
      url: '/',
      templateUrl: 'app/admin.users/model.html',
      data: {pageTitle: 'Users Panel - Create'},
      controller: 'AdminUsersModelCtrl',
      controllerAs: 'vm'
    })
    .state({
      name: 'admin.users.edit',
      url: '/:id',
      templateUrl: 'app/admin.users/model.html',
      data: {pageTitle: 'Users Panel - Edit'},
      controller: 'AdminUsersModelCtrl',
      controllerAs: 'vm'
    });
});
