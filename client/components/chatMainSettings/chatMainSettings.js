(function () {

  'use strict';

  angular.module('icssApp').directive('icChatMainSettings', function () {

    // @ngInject
    function icChatMainSettings() {
      var vm = this; //jshint ignore:line

      vm.loading = false;

    }

    return {
      restrict: 'E',
      templateUrl: 'components/chatMainSettings/chatMainSettings.html',
      controllerAs: 'vm',
      controller: icChatMainSettings
    };

  });
})();
