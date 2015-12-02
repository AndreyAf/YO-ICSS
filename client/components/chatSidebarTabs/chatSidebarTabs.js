(function () {

    'use strict';

    angular.module('icssApp').directive('icSidebarTabs', function () {
        return {
            restrict: 'E',
            scope: {
                users: '=',
                companies : '='
            },
            templateUrl: 'components/chatSidebarTabs/chatSidebarTabs.html',
            controllerAs: 'vm',
            controller: icSidebarTabs
        };

        // @ngInject
        function icSidebarTabs($scope){
            var vm = this; //jshint ignore:line
            vm.users = $scope.users;
            vm.companies = $scope.companies;
        }
    });
})();
