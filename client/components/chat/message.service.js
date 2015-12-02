'use strict';

angular.module('icssApp')
  .factory('Message', function ($resource) {
    return $resource('/api/messages/:id/:controller', {
        id: '@_id'
      },
      {
        // TODO: remove if not needed
        get: {
          method: 'GET',
          params: {
            id:'me'
          }
        }
      });
  });
