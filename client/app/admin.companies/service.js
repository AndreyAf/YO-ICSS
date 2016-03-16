'use strict';

angular.module('icssApp').factory('CompanySvc', companySvc);

function companySvc($resource) {

  var companyRsc = $resource('/api/companies/:id', {id: '@_id'}, {'update': {method: 'PUT'}});

  var service = {
    query: query,
    getById: getById,
    create: create,
    update: update,
    remove: remove
  };

  return service;

  //////////

  function query() {
    return companyRsc.query().$promise;
  }

  function get(id) {
    return companyRsc.get({id: id}).$promise;
  }

  function getById(id) {
    return companyRsc.get({id: id}).$promise;
  }

  function create(company){
    return companyRsc.save(company).$promise;
  }

  function update(company){
    return companyRsc.update(company).$promise;
  }

  function remove(id) {
    return companyRsc.delete({id: id}).$promise;
  }
}
