'use strict';

angular.module('icssApp')
  .factory('Message', function ($resource) {
    return $resource('/api/messages/:id/:controller', {
        id: '@_id'
      });
  });
