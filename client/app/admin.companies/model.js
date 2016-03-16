'use strict';

angular.module('icssApp').controller('AdminCompanyModelCtrl', adminCompanyModelCtrl);

/* @ngInject */
function adminCompanyModelCtrl(CompanySvc, $state, $q) {
  var vm = this;

  vm.company = null;

  vm.saveCompany = saveCompany;
  vm.addDepartment = addDepartment;
  vm.removeDepartment = removeDepartment;

  activate();

  //////////

  function activate() {
    vm.loading = true;
    var promise = $state.params.id ? CompanySvc.getById($state.params.id) : $q.resolve({
      name: null,
      slogan: null,
      description: null,
      departments: [],
      logo_url: null
    });

    promise.then(function (company) {
      vm.company = company;
    }).catch(function (err) {
      // TODO : add error handler
    }).finally(function () {
      vm.loading = false;
    });
  }

  function saveCompany() {
    vm.loading = true;
    var promise = vm.company._id ? CompanySvc.update(vm.company) : CompanySvc.create(vm.company);

    promise.then(function () {
      $state.go('admin.companies.list');
    });
  }

  function addDepartment() {
    vm.company.departments.push({
      name: 'New department #' + vm.company.departments.length,
      description: null,
      email: null,
      location: {
        country: null,
        city: null,
        address: null
      },
      phone: null,
      fax: null
    });
  }

  function removeDepartment(index) {
    vm.company.departments.splice(index, 1);
  }
}
