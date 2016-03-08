'use strict';

angular.module('icssApp').factory('SessionSvc', sessionSvc);

function sessionSvc($resource) {

  var sessionRsc = $resource('/api/singleSessions/:id', {id: '@_id'});

  var service = {
    query: query
  };

  return service;

  //////////

  function query() {
    return sessionRsc.query().$promise;
  }

  function get(id) {
    return sessionRsc.get({id: id}).$promise;
  }
}
