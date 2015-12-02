(function () {

    'use strict';

    angular.module('icssApp').directive('icSidebarTabs', function () {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'components/chatSidebarTabs/chatSidebarTabs.html',
            controllerAs: 'vm',
            controller: icSidebarTabs
        };

        // @ngInject
        function icSidebarTabs(User){
            var vm = this; //jshint ignore:line

            vm.users = User.query();
            vm.companies = [];
        }
    });
})();
