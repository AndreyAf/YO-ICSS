(function () {
  'use strict';

  angular.module('icssApp').controller('chatMainInfoCtrl', chatMainInfoCtrl);

  // @ngInject
  function chatMainInfoCtrl(currentChatType) {
    var vm = this; //jshint ignore:line

    vm.currentChatInfo = currentChatType;

  }
})();
