(function () {

  'use strict';

  angular.module('icssApp').controller('chatMainCompanyIntroCtrl', chatMainCompanyIntroCtrl);

  // @ngInject
  function chatMainCompanyIntroCtrl(currentCompany) {
    var vm = this; //jshint ignore:line

    vm.currentCompany = currentCompany;

    //////////

  }
})();
