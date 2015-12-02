(function () {

    'use strict';

    angular.module('icssApp').directive('icSidebarProfile', function () {
        return {
            restrict: 'E',
            scope: {
                user: '='
            },
            templateUrl: 'components/chatSidebarProfile/sidebarProfile.html',
            controllerAs: 'vm',
            controller: icSidebarProfile
        };

        // @ngInject
        function icSidebarProfile($scope, $rootScope){
            var vm = this; //jshint ignore:line

            // TODO: get current user data
            vm.user = $scope.user;
            vm.isFullscreen = $rootScope.isFullscreen;

            vm.setFullScreenStatus = function(){
                $rootScope.isFullscreen = !$rootScope.isFullscreen;
                vm.isFullscreen = $rootScope.isFullscreen;
            };
        }
    });
})();
