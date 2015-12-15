(function () {

  'use strict';

  function ciChatSvc(socket, Auth, ciMessageSvc, ciSingleSessionSvc) {

    var currentChat = {
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
      getCurrentChat: function(){
        return currentChat;
      },
      getCurrentState: function(){
        return currentState;
      },
      setCurrentState: function(state){
        currentState = state;
      },
      addMessage: function (message) {
        currentChat.messages.push(message);
      },
      setCurrentChat: function (item) {

        // Get session by item id
        ciSingleSessionSvc.getSession(item._id,function(ses){

          // Set state to chat
          currentState = states.chat;

          // Set current chat title
          currentChat.title = item.name;

          // TODO: add $promise
          // Set current chat messages
          currentChat.messages = ciMessageSvc.getLastMessages();

          currentChat.isActive = true;
        });
      },
      sendMessage: function (message) {

        var newMesasge = {
          _session: ciSingleSessionSvc.getCurrentSession()._id,
          _sender: Auth.getCurrentUser()._id,
          content: message
        };

        // Send message to socket
        socket.socket.emit('new message', newMesasge);
      }
    };
  }

  angular.module('icssApp').factory('ciChatSvc', ciChatSvc);

})();
