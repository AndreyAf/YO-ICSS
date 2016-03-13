'use strict';

angular.module('icssApp').factory('CompanySvc', companySvc);

function companySvc($resource) {

  var companyRsc = $resource('/api/companies/:id', {id: '@_id'});

  var service = {
    query: query,
    getById: getById,
    create: create,
    update: update
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

  function update(){

  }
}
