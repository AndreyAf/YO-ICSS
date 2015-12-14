'use strict';

angular.module('icssApp')
  .factory('SingleSession', function ($resource) {
    return $resource('/api/singleSessions/:id/:controller', {
      id: '@_id'
    },{
      getSession: {
          method: 'PUT',
          params: {
            controller: 'getSession'
          }
        }
      });
  });
