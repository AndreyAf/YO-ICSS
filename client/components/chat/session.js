(function () {

  'use strict';

  angular.module('icssApp').factory('ciSessionSvc', SessionSvc);

  function SessionSvc(Session, Auth) {

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

    var session = '123123';

    var svc = {
      session: session,
      getCurrentSession: function () {
        return session;
      },
      setSession: function(){

      }
    };

    return svc;
  }

})();
