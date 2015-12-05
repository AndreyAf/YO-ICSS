'use strict';

angular.module('icssApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        title: 'Index',
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      });
  });
