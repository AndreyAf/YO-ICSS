(function () {

    'use strict';

    angular.module('icssApp').directive('icChatMain', function () {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'components/chatMain/chatMain.html',
            controllerAs: 'vm',
            controller: icChatMain
        };

        // @ngInject
        function icChatMain(ciChatSvc, $rootScope) {
            var vm = this; //jshint ignore:line

            vm.users = ciChatSvc.getPrivateChats();

            vm.companies = ciChatSvc.getCompaniesChats();

            vm.emojiMessage = {};

            vm.currentChat = $rootScope.currentChat;

            $rootScope.$watch('currentChat', function (newVal, oldVal) {
                vm.currentChat = newVal;
            });

            $rootScope.$on('keyup', function (event, data) {
                if (data == 13) {
                    vm.sendMessage();
                }
            });

            vm.joinSession = function () {

                ciChatSvc.connection.close();

                ciChatSvc.connection.join('dhjshjsdf435345');
            };

            ciChatSvc.connection.onmessage = function (e) {
                $rootScope.currentChat.messages.push(
                    {
                        content: e.data,
                        sent: 'remote date'
                    }
                );

                $rootScope.$apply();
            };

            vm.sendMessage = function () {

                // TODO: finish that
                var message = {
                    content: vm.emojiMessage.messagetext,
                    sentAt: new Date(),
                    sendBy: ''
                };

                $rootScope.currentChat.messages.push({
                    content: vm.emojiMessage.messagetext,
                    sent: new Date()
                });

                ciChatSvc.connection.send(vm.emojiMessage.messagetext);
                //ciChatSvc.sendMessage(vm.emojiMessage.messagetext);

                vm.emojiMessage.messagetext = "";
                vm.emojiMessage.rawhtml = "";
            };

            vm.keyup = function (event) {
                console.log('keyup', event);
            };
        }
    });
})();
