(function () {

    'use strict';

    angular.module('icssApp').directive('icSidebarListItemSingle', function () {
        return {
            restrict: 'E',
            scope: {
                item: '='
            },
            templateUrl: 'components/chatSidebarListItemSingle/sidebarListItemSingle.html',
            controllerAs: 'vm',
            controller: icSidebarListItemSingle
        };

        // @ngInject
        function icSidebarListItemSingle($scope, $rootScope) {
            var vm = this; //jshint ignore:line

            // TODO: get current user data
            vm.user = $scope.item;

            vm.selectItem = function (user) {
                $rootScope.currentChat = {
                    user: user,
                    messages: []
                };
            };

          ciChatSvc.socket.emit('new user', {
            username: 'demo user'
          });
        }
    });
})();
