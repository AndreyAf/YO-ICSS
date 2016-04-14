(function () {

  'use strict';

  angular.module('icssApp').controller('chatMainSettingsCtrl', chatMainSettingsCtrl);

  // @ngInject
  function chatMainSettingsCtrl() {
    var vm = this; //jshint ignore:line

    vm.loading = false;
  }
})();
