'use strict';

angular.module('icssApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
        id: '@_id'
      },
      {
        'update': {
          method: 'PUT'
        },
        changePassword: {
          method: 'PUT',
          params: {
            controller: 'password'
          }
        },
        addContact: {
          method: 'PUT',
          params: {
            controller: 'addContact'
          }
        },
        get: {
          method: 'GET',
          params: {
            id: 'me'
          }
        },
        getPossibleContacts: {
          method: 'GET',
          isArray: true,
          params: {
            controller: 'getPossibleContacts'
          }
        }
      });
  });
