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
      session = null;

    var hashSession = function (str1, str2) {
      var hash = '', i, chr, len;

      if (str1.length === 0 || str2.length === 0 || str1.length != str2.length) return hash;

      for (i = 0, len = str1.length; i < len; i++) {
        chr = String.fromCharCode((str1.charCodeAt(i) + str2.charCodeAt(i) + str1.charCodeAt(len-1)+ str2.charCodeAt(len-1))%93+33);
        hash += chr;
      }
      return hash;
    };

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
        return Auth.getCurrentUser(function (user) {

          var sessionCalc = hashSession(user._id, _participantTwo);

          session = sessionCalc;

          socket.socket.emit('new user', {
            user: {
              id: user.id,
              name: user.name
            },
            _session: sessionCalc
          });

          return session;
        });
      }
    };
  }

  angular.module('icssApp').factory('ciSingleSessionSvc', SingleSessionSvc);

})();
