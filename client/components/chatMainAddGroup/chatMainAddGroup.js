(function () {

  'use strict';

  angular.module('icssApp').directive('icChatMainAddGroup', function () {

    // @ngInject
    function icChatMainAddGroup($scope,ciGroupSvc) {
      var vm = this; //jshint ignore:line

      vm.loading = false;
      vm.group = null;

      vm.addGroup = function () {
        ciGroupSvc.addGroup(vm.group)
          .then(function () {
            $scope.$parent.$parent.state = 'empty';
          });
      };
    }

    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'components/chatMainAddGroup/chatMainAddGroup.html',
      controllerAs: 'vm',
      controller: icChatMainAddGroup
    };

  });
})();
