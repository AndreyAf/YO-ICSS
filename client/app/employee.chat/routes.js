'use strict';

angular.module('icssApp').config(function ($stateProvider) {

  $stateProvider
    .state({
      name: 'employeeChat',
      url: '/employee/:session',
      templateUrl: 'app/employee.chat/chat.html',
      data: {
        pageTitle: 'Employee - Chat'
      },
      controller: 'EmployeeChatCtrl',
      controllerAs: 'vm',
      authenticate: true,
      //resolve: {
      //  department: /* @ngInject */ function ($stateParams, CompanySvc) {
      //    return CompanySvc.getById($stateParams.cmpId).then(function (cmp) {
      //      var dp = cmp.departments.filter(function (dp) {
      //        return dp._id === $stateParams.dpId;
      //      });
      //
      //      return dp[0];
      //    });
      //  }
      //}
    });
});
