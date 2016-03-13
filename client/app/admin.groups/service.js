'use strict';

angular.module('icssApp').factory('GroupSvc', groupSvc);

function groupSvc($resource) {

  var groupRsc = $resource('/api/groups/:id', {id: '@_id'});

  var service = {
    query: query,
    getById: getById,
    remove: remove
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
    return groupRsc.remove({id: id}).$promise;
  }
}
