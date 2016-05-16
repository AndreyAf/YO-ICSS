(function () {

  'use strict';

  function ciMessageSvc(Auth, $http, SingleSession) {
    /**
     * Return a callback or noop function
     *
     * @param  {Function|*} cb - a 'potential' function
     * @return {Function}
     */
    var safeCb = function (cb) {
        return (angular.isFunction(cb)) ? cb : angular.noop;
      };

    return {
      getLastMessages: function (callback) {

        var res =[{
          "_id": "565f1fc64c459d1816ab868d",
          "content": "123456123",
          "_sender": {
            "_id": "565f1fb54c459d1816ab8688"
          },
          "_session": "123123",
          "created_at":"2015-12-02T16:43:50.335Z",
          "__v": 0
        },{
          "_id": "565f1fc64c459d1816ab868d",
          "content": "456123456",
          "_sender": {
            "_id": "565f1fb54c459d1816ab8688"
          },
          "_session": "123123",
          "created_at":"2015-12-02T16:43:50.335Z",
          "__v": 0
        }];

        return res;
        //return SingleSession.getSession({id: Auth.getCurrentUser()._id}, {
        //  _participantTwo: _participantTwo
        //}, function (_session_) {
        //  session = _session_;
        //
        //  // Get last messages on this session
        //  ciMessageSvc.getLastMessages(session);
        //
        //  return safeCb(callback)(null);
        //}, function (err) {
        //  return safeCb(callback)(err);
        //}).$promise;

      },
      getMoreMessages: function(callback){
        // TODO: add functionality
        // Add more messeges
      }
    };
  }

  angular.module('icssApp').factory('ciMessageSvc', ciMessageSvc);

})();
