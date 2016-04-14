(function () {

  'use strict';

  angular.module('icssApp').directive('icSidebarListItemSingle', function () {

    // @ngInject
    function icSidebarListItemSingle($scope, ciChatSvc) {
      var vm = this; //jshint ignore:line

    }

    return {
      restrict: 'E',
      scope: {
        item: '='
      },
      templateUrl: 'components/chatSidebarListItemSingle/sidebarListItemSingle.html',
      controllerAs: 'vm',
      controller: icSidebarListItemSingle
    };

  });
})();
