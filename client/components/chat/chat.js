(function () {

  'use strict';

  function ciChatSvc(socket, Auth, ciMessageSvc, ciSingleSessionSvc, $state) {

    var currentChat = {
      _id: null,
      title: null,
      img: 'assets/images/user.png',
      status: 'Online',
      messages: [],
      isActive: false
    };

    var states = {
      empty: 'empty',
      chat: 'chat',
      addContact: 'addContact'
    };

    var currentState = states.empty;

    return {
      states: states,
      socket: socket.socket,
      currentChat: currentChat,
      getCurrentChat: function () {
        return currentChat;
      },
      getCurrentState: function () {
        return currentState;
      },
      setCurrentState: function (state) {
        currentState = state;
      },
      addMessage: function (message) {
        currentChat.messages.push(message);
      },
      setCurrentChat: function (item) {

        //// Get session by item id
        //return ciSingleSessionSvc.getSession(item._id, function (ses) {
        //
        //
        //  // Set state to chat
        //  currentState = states.chat;
        //
        //  // Set current chat title
        //  currentChat.title = item.name;
        //
        //  // TODO: add $promise
        //  // Set current chat messages
        //  currentChat.messages = ciMessageSvc.getLastMessages();
        //
        //  currentChat.isActive = true;
        //  return currentChat;
        //});
        ciSingleSessionSvc.getSession(item._id, function (ses) {

        });

        currentChat._id = item._id;
        currentChat.title = item.name;
        currentChat.messages = ciMessageSvc.getLastMessages();
        currentChat.isActive = true;

        return currentChat;
      },
      sendMessage: function (message) {

        var newMesasge = {
          _session: ciSingleSessionSvc.getCurrentSession(),
          _sender: Auth.getCurrentUser()._id,
          content: message
        };

        //currentChat.messages.push(newMesasge);

        // Send message to socket
        socket.socket.emit('new message', newMesasge);
      }
    };
  }

  angular.module('icssApp').factory('ciChatSvc', ciChatSvc);

})();
