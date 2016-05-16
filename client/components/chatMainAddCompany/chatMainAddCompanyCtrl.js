(function () {
  'use strict';

  angular.module('icssApp').controller('chatMainAddCompanyCtrl', chatMainAddCompanyCtrl);

  // @ngInject
  function chatMainAddCompanyCtrl(User, lodash, Auth) {
    var vm = this; //jshint ignore:line

    vm.loading = false;
    vm.search = "";
    vm.companies = [];

    vm.addCompany = addCompany;

    activate();

    /////////

    function activate() {
      vm.loading = true;

      Auth.getPossibleCompanies()
        .then(function (companies) {
          vm.companies = companies;
        })
        .finally(function () {
          vm.loading = true;
        });
    }

    function addCompany(_company) {

      vm.loading = true;

      Auth.addCompany(_company, function () {

        // Remove company from users list
        vm.companies = lodash.remove(vm.companies, function (company) {
          return company._id !== _company._id;
        });

        vm.loading = false;
      });
    }
  }
})();
