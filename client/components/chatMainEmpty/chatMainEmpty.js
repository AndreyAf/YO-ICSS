(function () {

  'use strict';

  angular.module('icssApp').directive('icChatMainEmpty', function () {

    // @ngInject
    function icChatMainEmpty() {
      var vm = this; //jshint ignore:line
    }

    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'components/chatMainEmpty/chatMainEmpty.html',
      controllerAs: 'vm',
      controller: icChatMainEmpty
    };

  });
})();
