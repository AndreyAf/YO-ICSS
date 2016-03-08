'use strict';

angular.module('icssApp').factory('UserSvc', userSvc);

function userSvc($resource) {

  var userRsc = $resource('/api/users/:id', {id: '@_id'});

  var service = {
    query: query,
    getById: getById
  };

  return service;

  //////////

  function query() {
    return userRsc.query().$promise;
  }

  function get(id) {
    return userRsc.get({id: id}).$promise;
  }

  function getById(id) {
    return userRsc.get({id: id}).$promise;
  }
}
