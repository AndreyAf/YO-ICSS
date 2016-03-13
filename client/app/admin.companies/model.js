'use strict';

angular.module('icssApp').controller('AdminCompanyModelCtrl', adminCompanyModelCtrl);

function adminCompanyModelCtrl(CompanySvc, $state, $q) {
  var vm = this;

  var orgCompany = null;

  vm.loading = true;
  vm.company = null;

  vm.deleteCompany = deleteCompany;
  vm.addCompany = addCompany;
  vm.updateCompany = updateCompany;
  vm.addDepartment = addDepartment;
  vm.removeDepartment = removeDepartment;

  activate();

  //////////

  function activate() {

    var promise = $state.params.id ? CompanySvc.getById($state.params.id) : $q.resolve({
      name: 'h',
      slogan: null,
      description: null,
      departments: [],
      logo_url: null
    });

    promise.then(function (company) {
      orgCompany = company;
      vm.company = angular.copy(company);
    }).catch(function (err) {
      // TODO : add error handler
    }).finally(function () {
      vm.loading = false;
    });
  }

  function deleteCompany(company) {

  }

  function addCompany() {
    CompanySvc.create(vm.company)
      .then(function () {
        $state.go('admin.companies.list');
      });
  }

  function updateCompany() {

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
