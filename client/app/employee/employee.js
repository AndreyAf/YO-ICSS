'use strict';

angular.module('icssApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('employee', {
        url: '/employee',
        templateUrl: 'app/employee/employee.html',
        controller: 'EmployeeCtrl',
        authenticate: true
      });
  });
