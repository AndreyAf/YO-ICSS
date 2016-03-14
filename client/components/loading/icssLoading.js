(function () {

  'use strict';

  angular.module('icssApp').directive('icLoading', function () {

    return {
      restrict: 'E',
      scope: {
        isLoading: '='
      },
      template: '' +
      '<div class="loading-block" ng-show="loadingCtrl.isLoading">' +
      ' <div class="sk-folding-cube">' +
      '   <div class="sk-cube1 sk-cube"></div>' +
      '   <div class="sk-cube2 sk-cube"></div>' +
      '   <div class="sk-cube4 sk-cube"></div>' +
      '   <div class="sk-cube3 sk-cube"></div> ' +
      ' </div>' +
      '</div>',
      controllerAs: 'loadingCtrl',
      controller: function () {
      },
      bindToController: true
    };

  });
})();
