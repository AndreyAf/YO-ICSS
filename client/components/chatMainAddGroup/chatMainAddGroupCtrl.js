(function () {
  'use strict';

  angular.module('icssApp').controller('chatMainAddGroupCtrl', chatMainAddGroupCtrl);

  // @ngInject
  function chatMainAddGroupCtrl($scope, ciGroupSvc) {
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
})();
