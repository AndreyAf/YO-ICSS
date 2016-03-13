(function () {

  'use strict';

  angular.module('icssApp').directive('icChatMainAddCompany', function () {

    // @ngInject
    function icChatMainAddCompany(User, lodash, Auth) {
      var vm = this; //jshint ignore:line

      vm.loading = false;
      vm.search = "";
      vm.companies = [];

      vm.addCompanies = function (_company) {

        vm.loading = true;

        Auth.addCompany(_company, function () {

          // Remove contact from users list
          vm.companies = lodash.remove(vm.companies, function (company) {
            return company._id != _company._id;
          });

          vm.loading = false;
        });
      };

      // Get users
      var getCompanies = function () {
        vm.loading = true;
        Auth.getPossibleCompanies(function (companies) {
          vm.companies = companies;
        })
      };

      getCompanies();
    }

    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'components/chatMainAddCompany/chatMainAddCompany.html',
      controllerAs: 'vm',
      controller: icChatMainAddCompany
    };

  });
})();
