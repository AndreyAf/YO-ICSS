(function () {

  'use strict';

  function SingleSessionSvc(Auth, $http, SingleSession, ciMessageSvc) {
    /**
     * Return a callback or noop function
     *
     * @param  {Function|*} cb - a 'potential' function
     * @return {Function}
     */
    var safeCb = function (cb) {
      return (angular.isFunction(cb)) ? cb : angular.noop;
    },
      session = {
        "_id" : 'jy6Xat9LrMSK3aK9_ah3dlnkO-WsEBE6'
      };

    return {
      session: session,
      getSession: function (_participantTwo, callback) {

        return safeCb(callback)(session);
        //return SingleSession.getSession({id: Auth.getCurrentUser()._id}, {
        //  _participantTwo: _participantTwo
        //}, function (_session_) {
        //  session = _session_;
        //
        //  // Get last messages on this session
        //  ciMessageSvc.getLastMessages(session);
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
