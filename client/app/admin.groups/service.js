'use strict';

angular.module('icssApp').factory('GroupSvc', groupSvc);

/* @ngInject */
function groupSvc($resource, $q, $http) {

  var groupRsc = $resource('/api/groups/:id', {id: '@_id'}, {'update': {method: 'PUT'}});

  var service = {
    query: query,
    getById: getById,
    remove: remove,
    create: create,
    update: update,
    addUser: addUser,
    removeUser: removeUser
  };

  return service;

  //////////

  function query() {
    return groupRsc.query().$promise;
  }

  function get(id) {
    return groupRsc.get({id: id}).$promise;
  }

  function getById(id) {
    return groupRsc.get({id: id}).$promise;
  }

  function remove(id) {
    return groupRsc.delete({id: id}).$promise;
  }

  function create(group) {
    return groupRsc.save(group).$promise;
  }

  function update(group) {
    return groupRsc.update(group).$promise;
  }

  function addUser(groupId, userId) {
    return $http({method: 'GET', url: '/api/groups/' + groupId + '/addUser/' + userId});
  }

  function removeUser(groupId, userId) {
    return $http({method: 'GET', url: '/api/groups/' + groupId + '/removeUser/' + userId});
  }
}
