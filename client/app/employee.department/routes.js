'use strict';

angular.module('icssApp').config(function ($stateProvider) {

  $stateProvider
    .state({
      name: 'employee.departments',
      abstract: true,
      url: '/departments',
      views: {
        'content': {
          template: '<ui-view></ui-view>'
        }
      }
    })
    .state({
      name: 'employee.departments.item',
      url: '/:cmpId/:dpId',
      templateUrl: 'app/employee.department/model.html',
      data: {
        pageTitle: 'Departments - Item'
      },
      controller: 'EmployeeDepartmentItemCtrl',
      controllerAs: 'vm',
      authenticate: true,
      resolve: {
        department: /* @ngInject */ function ($stateParams, CompanySvc) {
          return CompanySvc.getById($stateParams.cmpId).then(function (cmp) {
            var dp = cmp.departments.filter(function (dp) {
              return dp._id === $stateParams.dpId;
            });

            return dp[0];
          });
        }
      }
    })
    .state({
      name: 'employee.departments.list',
      url: '',
      template: '<legend>Departments</legend>',
      data: {pageTitle: 'Departments - List'},
      controller: 'AdminUsersListCtrl',
      controllerAs: 'vm',
      authenticate: true
    });
});
