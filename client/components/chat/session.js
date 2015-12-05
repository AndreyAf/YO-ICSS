(function () {

  'use strict';

  function SessionSvc() {

    // Get session by current user and other user / group / company
    //var setSession = function (type,_otherUser) {
    //
    //  // Get session for one-to-one
    //  Session.get({
    //    type : 'single',
    //    _currentUser : Auth.getCurrentUser()._id,
    //    _otherUser: _otherUser
    //  });
    //
    //  // TODO: Get session for one-group
    //
    //  // TODO: Get session for one-company
    //
    //};

    var session = {};

    return {
      getSession: function(){
        //if(session === {}) {
        //  // TODO : create / get session
          session = {
            _id : '123123123'
          };
        //}

        return session;
      }
    };
  }

  angular.module('icssApp').factory('ciSessionSvc', SessionSvc);

})();
