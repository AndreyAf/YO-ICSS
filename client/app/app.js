'use strict';

angular.module('icssApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'btford.socket-io',
    'ui.router',
    'ui.bootstrap',
    'validation.match',
    'ngTouch',
    'sun.scrollable',
    'emojiApp',
    'ngTextTruncate',
    'ngLodash'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    $httpProvider.interceptors.push('authInterceptor');
  })
  .constant('config', {
    SIGNALIG_SERVER_URL: undefined
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookies, $injector) {
    var state;
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookies.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookies.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function (response) {
        if (response.status === 401) {
          (state || (state = $injector.get('$state'))).go('login');
          // remove any stale tokens
          $cookies.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $state, Auth, lodash) {
    // Route state change (before open)
    $rootScope.$on('$stateChangeStart', function (event, next) {

      // Check if the user need to login before open this route
      if (next.authenticate) {
        Auth.isLoggedIn(function (loggedIn) {
          if (!loggedIn) {
            event.preventDefault();
            $state.go('login');
          }
        });

        // Check if route contain roles
        if (next.roles) {

          Auth.getCurrentUser(function (user) {
            var currentUserRoles = user.roles;

            // Check if the current users has one of route roles
            if ((lodash.intersection(next.roles, currentUserRoles)).length === 0) {
              event.preventDefault();
              $state.go('login');
            }
          });

        }
      }

    });
  });
