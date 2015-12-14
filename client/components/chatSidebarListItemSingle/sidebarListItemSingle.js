(function () {

  'use strict';

  angular.module('icssApp').directive('icSidebarListItemSingle', function () {

    // @ngInject
    function icSidebarListItemSingle($scope, ciChatSvc) {
      var vm = this; //jshint ignore:line

      /***
       * Select item from sidebar list
       * @param selectItem
         */
      vm.selectItem = function (selectItem) {

        // Set current chat by selected item
        ciChatSvc.setCurrentChat(selectItem);

      };
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
