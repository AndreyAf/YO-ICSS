'use strict';

angular.module('icssApp').controller('EmployeeDepartmentItemCtrl', employeeDepartmentItemCtrl);

function employeeDepartmentItemCtrl(department) {
  var vm = this;

  vm.department = department;
  vm.waitUsers = [{
    _id: 'sampleId45',
    name: 'sample user #1'
  }];

}
