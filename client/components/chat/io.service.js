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
    console.log(io);
    console.log(typeof io);
    if (typeof io === 'undefined') {
      throw new Error('Socket.io required');
    }
    return io;
  });
