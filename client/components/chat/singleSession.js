(function () {

  'use strict';

  function SingleSessionSvc(Auth, SingleSession, ciMessageSvc, socket) {
    /**
     * Return a callback or noop function
     *
     * @param  {Function|*} cb - a 'potential' function
     * @return {Function}
     */
    var safeCb = function (cb) {
        return (angular.isFunction(cb)) ? cb : angular.noop;
      },
      session = null;

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

        return SingleSession.getSession({
          id: currentId,
          otherId: _participantTwo
        }, function (_session_) {

          // TODO: Get last messages on this session
          ciMessageSvc.getLastMessages(_session_);

          if (session == null) {

            // Notify socket that new user connected
            socket.socket.emit('new user', {
              user: {
                name: Auth.getCurrentUser().name
              },
              _session: _session_._id
            });
          }
          else {

            // switch room
            socket.socket.emit('switch room', {
              _oldSession: session._id,
              _newSession: _session_._id
            });

          }

          // Set chat session
          session = _session_;

          return safeCb(callback)(_session_);
        }, function (err) {
          return safeCb(callback)(err);
        }).$promise;

      }
    };
  }

  angular.module('icssApp').factory('ciSingleSessionSvc', SingleSessionSvc);

})();
