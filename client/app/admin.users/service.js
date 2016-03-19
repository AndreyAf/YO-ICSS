'use strict';

angular.module('icssApp').factory('UserSvc', userSvc);

function userSvc($resource) {

  var userRsc = $resource('/api/users/:id', {id: '@_id'}, {'update': {method: 'PUT'}});

  var service = {
    query: query,
    getById: getById,
    remove: remove,
    create: create,
    update: update
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

  function remove(id) {
    return userRsc.delete({id: id}).$promise;
  }

  function create(group) {
    return userRsc.save(group).$promise;
  }

  function update(group) {
    return userRsc.update(group).$promise;
  }
}
