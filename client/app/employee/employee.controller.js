'use strict';

// @ngInject */
function employeeCtrl($scope, User, Auth) {

  $scope.workCompanies = [];

  activate();

  /////////

  function activate() {

    // Get all companies that current user is working in.
    Auth.getCurrentUser(function (user) {
      User.getWorkCompanies({id: user._id}).$promise
        .then(function (workCompanies) {
          $scope.workCompanies = workCompanies;
        });
    });
  }

}

angular.module('icssApp').controller('EmployeeCtrl', employeeCtrl);


