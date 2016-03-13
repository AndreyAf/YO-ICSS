(function () {

  'use strict';

  /* @ngInject */
  function ciGroupSvc($resource, Auth) {

    var groupRsc = $resource('/api/groups/:id/:controller', {
        id: '@_id'
      },
      {
        'update': {
          method: 'PUT'
        }
      });

    return {
      addGroup: function(group){

        var user = Auth.getCurrentUser();

        // set group with current user
        group.users = [{_id: user._id}];

        // get current user
        return groupRsc.save(group).$promise;
      }
    };
  }

  angular.module('icssApp').factory('ciGroupSvc', ciGroupSvc);

})();
