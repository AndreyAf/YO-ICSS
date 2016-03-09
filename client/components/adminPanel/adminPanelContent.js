(function () {

    'use strict';

    angular.module('icssApp').directive('icAdminPanelContent', function () {

        return {
            restrict: 'E',
            scope: {
                title: '=',
                createTitle: '=',
                createSref: '='
            },
            template: '<div class="panel panel-primary">' +
            '   <div class="panel-heading clearfix"> ' +
            '       <h3 class="panel-title pull-left" ng-bind="vm.title"></h3> ' +
            '       <div class="pull-right" ng-if="vm.createTitle && vm.createSref"> ' +
            '           <a class="btn btn-success" ui-sref="{{vm.createSref}}" ng-bind="vm.createTitle"></a> ' +
            '       </div> ' +
            '   </div> ' +
            '<div ng-transclude></div> ' +
            '</div>',
            controllerAs: 'vm',
            controller: function () {
            },
            bindToController: true,
            transclude: true
        };

    });
})();
