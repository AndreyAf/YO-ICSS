(function () {

  'use strict';

  angular.module('icssApp').directive('icSidebarCompanyListItem', function () {

    // @ngInject
    function icSidebarCompanyListItem($scope, ciChatSvc) {
      var vm = this; //jshint ignore:line

    }

    return {
      restrict: 'E',
      scope: {
        item: '='
      },
      templateUrl: 'components/chatSidebarCompanyListItem/sidebarCompanyListItem.html',
      controllerAs: 'vm',
      controller: icSidebarCompanyListItem
    };

  });
})();
