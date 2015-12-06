'use strict';

/**
 * @ngdoc service
 * @name publicApp.Io
 * @description
 * # ciIoSvc
 * Factory in the publicApp.
 */
angular.module('icssApp')
  .factory('ciIoSvc', function () {
    if (typeof io === 'undefined') {
      throw new Error('Socket.io required');
    }
    return io;
  });
