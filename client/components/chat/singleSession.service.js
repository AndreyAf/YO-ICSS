'use strict';

angular.module('icssApp')
  .factory('SingleSession', function ($resource) {
    return $resource('/api/singleSessions/:id/:otherId/:controller', {
      id: '@_id'
    },{
      getSession: {
          method: 'GET',
          params: {
            controller: 'getSession'
          }
        }
      });
  });
