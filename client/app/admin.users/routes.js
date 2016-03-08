'use strict';

angular.module('icssApp').config(function ($stateProvider) {

  $stateProvider
    .state({
      name: 'admin.users',
      abstract: true,
      url: '/users',
      views: {
        'content': {
          templateUrl: '<ui-view></ui-view>'
        }
      }
    })
    .state({
      name: 'admin.users.list',
      url: '',
      templateUrl: 'app/admin.users/list.html',
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
