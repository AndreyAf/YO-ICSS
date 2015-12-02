(function () {

    'use strict';

    angular.module('icssApp').factory('ciChatSvc', ChatSvc);

    function ChatSvc() {

        var connection = new RTCMultiConnection();

        connection.session = {
            data: true
        };

        var session = 'dhjshjsdf435345';

        var svc = {

            connection: connection,

            startChat :  function(){

                connection.open(session);
            },

            isFullscreen: false,

            getCompaniesChats: function () {
                return [
                    {
                        name: 'comnany_1',
                        status: 'live',
                        statusMsg: 'Hello world',
                        img: 'assets/images/user.png'
                    }, {
                        name: 'comnany_1',
                        status: 'live',
                        statusMsg: 'Hello world',
                        img: 'assets/images/user.png'
                    }, {
                        name: 'comnany_1',
                        status: 'live',
                        statusMsg: 'Hello world',
                        img: 'assets/images/user.png'
                    }, {
                        name: 'comnany_1',
                        status: 'live',
                        statusMsg: 'Hello world',
                        img: 'assets/images/user.png'
                    }, {
                        name: 'comnany_1',
                        status: 'live',
                        statusMsg: 'Hello world',
                        img: 'assets/images/user.png'
                    }, {
                        name: 'comnany_1',
                        status: 'live',
                        statusMsg: 'Hello world',
                        img: 'assets/images/user.png'
                    }, {
                        name: 'comnany_1',
                        status: 'live',
                        statusMsg: 'Hello world',
                        img: 'assets/images/user.png'
                    }, {
                        name: 'comnany_1',
                        status: 'live',
                        statusMsg: 'Hello world',
                        img: 'assets/images/user.png'
                    }, {
                        name: 'comnany_1',
                        status: 'live',
                        statusMsg: 'Hello world',
                        img: 'assets/images/user.png'
                    }, {
                        name: 'comnany_1',
                        status: 'live',
                        statusMsg: 'Hello world',
                        img: 'assets/images/user.png'
                    }, {
                        name: 'comnany_1',
                        status: 'live',
                        statusMsg: 'Hello world',
                        img: 'assets/images/user.png'
                    }, {
                        name: 'comnany_1',
                        status: 'live',
                        statusMsg: 'Hello world',
                        img: 'assets/images/user.png'
                    }
                ]

            },

            getPrivateChats: function () {
                return [
                    {
                        name: 'Israel Israeli1',
                        status: 'live',
                        statusMsg: 'Hello world',
                        img: 'assets/images/user.png',
                        sessionToken: 'avshkmdvkashf1241314'
                    }, {
                        name: 'Israel Israeli2',
                        status: 'live',
                        statusMsg: 'Hello world',
                        img: 'assets/images/user.png'
                    }, {
                        name: 'Israel Israeli3',
                        status: 'live',
                        statusMsg: 'Hello world',
                        img: 'assets/images/user.png'
                    }, {
                        name: 'Israel Israeli4',
                        status: 'live',
                        statusMsg: 'Hello world',
                        img: 'assets/images/user.png'
                    }, {
                        name: 'Israel Israeli5',
                        status: 'live',
                        statusMsg: 'Hello world',
                        img: 'assets/images/user.png'
                    }, {
                        name: 'Israel Israeli6',
                        status: 'live',
                        statusMsg: 'Hello world',
                        img: 'assets/images/user.png'
                    }, {
                        name: 'Israel Israeli2',
                        status: 'live',
                        statusMsg: 'Hello world',
                        img: 'assets/images/user.png'
                    }, {
                        name: 'Israel Israeli3',
                        status: 'live',
                        statusMsg: 'Hello world',
                        img: 'assets/images/user.png'
                    }, {
                        name: 'Israel Israeli4',
                        status: 'live',
                        statusMsg: 'Hello world',
                        img: 'assets/images/user.png'
                    }, {
                        name: 'Israel Israeli5',
                        status: 'live',
                        statusMsg: 'Hello world',
                        img: 'assets/images/user.png'
                    }, {
                        name: 'Israel Israeli6',
                        status: 'live',
                        statusMsg: 'Hello world',
                        img: 'assets/images/user.png'
                    }, {
                        name: 'Israel Israeli2',
                        status: 'live',
                        statusMsg: 'Hello world',
                        img: 'assets/images/user.png'
                    }, {
                        name: 'Israel Israeli3',
                        status: 'live',
                        statusMsg: 'Hello world',
                        img: 'assets/images/user.png'
                    }, {
                        name: 'Israel Israeli4',
                        status: 'live',
                        statusMsg: 'Hello world',
                        img: 'assets/images/user.png'
                    }, {
                        name: 'Israel Israeli5',
                        status: 'live',
                        statusMsg: 'Hello world',
                        img: 'assets/images/user.png'
                    }, {
                        name: 'Israel Israeli6',
                        status: 'live',
                        statusMsg: 'Hello world',
                        img: 'assets/images/user.png'
                    }, {
                        name: 'Israel Israeli2',
                        status: 'live',
                        statusMsg: 'Hello world',
                        img: 'assets/images/user.png'
                    }, {
                        name: 'Israel Israeli3',
                        status: 'live',
                        statusMsg: 'Hello world',
                        img: 'assets/images/user.png'
                    }, {
                        name: 'Israel Israeli4',
                        status: 'live',
                        statusMsg: 'Hello world',
                        img: 'assets/images/user.png'
                    }, {
                        name: 'Israel Israeli5',
                        status: 'live',
                        statusMsg: 'Hello world',
                        img: 'assets/images/user.png'
                    }, {
                        name: 'Israel Israeli6',
                        status: 'live',
                        statusMsg: 'Hello world',
                        img: 'assets/images/user.png'
                    }
                ]
            },

            sendMessage: function (message) {
                //svc.connection.connect('sessionToken');
                //svc.connection.send(message);
            },

            renewLogin: function () {
            }

        };

        return svc;
    }

})();
