'use strict';

angular.module('icssApp')
  .factory('Session', function ($resource) {
    return $resource('/api/sessions/:id/:controller', {
      id: '@_id'
    });
  });
