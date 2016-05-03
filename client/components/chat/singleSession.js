(function () {
  'use strict';

  /* ngInject */
  function SingleSessionSvc(Auth, SingleSession, ciMessageSvc, socket, $q) {
    /**
     * Return a callback or noop function
     *
     * @param  {Function|*} cb - a 'potential' function
     * @return {Function}
     */
    var safeCb = function (cb) {
        return (angular.isFunction(cb)) ? cb : angular.noop;
      },
    // TODO: set null
      session = {_id: '123123'};

    return {
      getCurrentSession: function () {
        return session;
      },
      /***
       * Get session for current user and participant two
       * @param _participantTwo
       * @param callback
       * @returns {*|Function}
       */
      getSession: function (_participantTwo, callback) {
        var currentId = Auth.getCurrentUser()._id;


        // todo: rewrite
        return $q.when(session).then(function () {
          socket.socket.emit('new user', {
            user: {
              name: Auth.getCurrentUser().name
            },
            _session: session._id
          });
        });

        //SingleSession.getSession({
        //  id: currentId,
        //  otherId: _participantTwo
        //}, function (_session_) {
        //
        //  // TODO: Get last messages on this session
        //  ciMessageSvc.getLastMessages(_session_);
        //
        //  if (session == null) {
        //
        //    // Notify socket that new user connected
        //    socket.socket.emit('new user', {
        //      user: {
        //        name: Auth.getCurrentUser().name
        //      },
        //      _session: _session_._id
        //    });
        //  }
        //  else {
        //
        //    // switch room
        //    socket.socket.emit('switch room', {
        //      _oldSession: session._id,
        //      _newSession: _session_._id
        //    });
        //
        //  }
        //
        //  // Set chat session
        //  session = _session_;
        //
        //  return safeCb(callback)(_session_);
        //}, function (err) {
        //  return safeCb(callback)(err);
        //}).$promise;

      }
    };
  }

  angular.module('icssApp').factory('ciSingleSessionSvc', SingleSessionSvc);

})();
