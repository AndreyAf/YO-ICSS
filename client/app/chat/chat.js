'use strict';

angular.module('icssApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('chat', {
        url: '/chat',
        //abstract: true,
        templateUrl: 'app/chat/chat.html',
        controller: 'ChatCtrl',
        roles: ['client', 'employee', 'admin', 'manager'],
        authenticate: true,
        //redirectTo: "chat.main",
        abstract: true
      })
      .state('chat.main', {
        url: '/main',
        templateUrl: 'components/chatMainEmpty/chatMainEmpty.html',
        roles: ['client', 'employee', 'admin', 'manager'],
        controller: 'chatMainEmptyCtrl',
        controllerAs: 'vm',
        authenticate: true
      })

      .state('chat.info', {
        url: '/info/:type/:id',
        templateUrl: 'components/chatMainInfo/chatMainInfo.html',
        roles: ['client', 'employee', 'admin', 'manager'],
        controller: 'chatMainInfoCtrl',
        controllerAs: 'vm',
        authenticate: true,
        resolve: {
          currentChatType: /* @ngInject */ function ($stateParams, $state, UserSvc, GroupSvc, CompanySvc, $timeout) {
            if ($stateParams && $stateParams.type && $stateParams.id) {

              switch ($stateParams.type) {
                case 'user':
                  return UserSvc.getById($stateParams.id);
                case 'group':
                  return GroupSvc.getById($stateParams.id);
                case 'company':
                  return CompanySvc.getById($stateParams.id);
                default:
                  $timeout(function () {
                    $state.go('chat.main', {})
                  }, 0);
              }

            }
            else {
              $timeout(function () {
                $state.go('chat.main', {})
              }, 0);
            }
          }
        }
      })
      .state('chat.conversation', {
        url: '/conversation/:type/:id',
        templateUrl: 'components/chatMain/chatMain.html',
        roles: ['client', 'employee', 'admin', 'manager'],
        controller: 'chatMainCtrl',
        controllerAs: 'vm',
        authenticate: true,
        resolve: {
          currentChatType: /* @ngInject */ function ($stateParams, $state, UserSvc, GroupSvc, CompanySvc, $timeout, ciChatSvc) {
            if ($stateParams && $stateParams.type && $stateParams.id) {
              var currentChat = null;
              switch ($stateParams.type) {
                case 'user':
                  currentChat = UserSvc.getById($stateParams.id);
                  break;
                case 'group':
                  currentChat = GroupSvc.getById($stateParams.id);
                  break;
                case 'company':
                  currentChat = CompanySvc.getById($stateParams.id);
                  break;
                default:
                  $timeout(function () {
                    $state.go('chat.main', {})
                  }, 0);
              }
              return currentChat.then(function (currentChat) {
                return ciChatSvc.setCurrentChat(currentChat);
              });

            }
            else {
              $timeout(function () {
                $state.go('chat.main', {})
              }, 0);
            }
          }
        }
      })
      .state('chat.settings', {
        url: '/settings',
        templateUrl: 'components/chatMainSettings/chatMainSettings.html',
        roles: ['client', 'employee', 'admin', 'manager'],
        controller: 'chatMainSettingsCtrl',
        controllerAs: 'vm',
        authenticate: true
      })
      .state('chat.addContact', {
        url: '/addContact',
        templateUrl: 'components/chatMainAddContact/chatMainAddContact.html',
        roles: ['client', 'employee', 'admin', 'manager'],
        controller: 'chatMainAddContactCtrl',
        controllerAs: 'vm',
        authenticate: true
      })
      .state('chat.addGroup', {
        url: '/addGroup',
        templateUrl: 'components/chatMainAddGroup/chatMainAddGroup.html',
        roles: ['client', 'employee', 'admin', 'manager'],
        controller: 'chatMainAddGroupCtrl',
        controllerAs: 'vm',
        authenticate: true
      })
      .state('chat.addCompany', {
        url: '/addCompany',
        templateUrl: 'components/chatMainAddCompany/chatMainAddCompany.html',
        roles: ['client', 'employee', 'admin', 'manager'],
        controller: 'chatMainAddCompanyCtrl',
        controllerAs: 'vm',
        authenticate: true
      })
      .state('chat.companyIntro', {
        url: '/companyIntro/:id',
        templateUrl: 'components/chatMainCompanyIntro/chatMainCompanyIntro.html',
        roles: ['client', 'employee', 'admin', 'manager'],
        controller: 'chatMainCompanyIntroCtrl',
        controllerAs: 'vm',
        authenticate: true,
        resolve: {
          currentCompany: /* @ngInject */ function ($stateParams, $state, UserSvc, GroupSvc, CompanySvc, $timeout) {
            if ($stateParams && $stateParams.id) {
              return CompanySvc.getById($stateParams.id);
            }
            else {
              $timeout(function () {
                $state.go('chat.main', {})
              }, 0);
            }
          }
        }
      })
      .state('chat.departmentCall', {
        url: '/company/:companyId/department/:departmentId',
        templateUrl: 'components/chatMainDepartment/chatMainDepartmentCall.html',
        roles: ['client', 'employee', 'admin', 'manager'],
        controller: 'chatMainDepartmentCtrl',
        controllerAs: 'vm',
        authenticate: true,
        resolve: {
          currentCompany: /* @ngInject */ function ($stateParams, $state, UserSvc, GroupSvc, CompanySvc, $timeout) {
            if ($stateParams && $stateParams.companyId) {
              return CompanySvc.getById($stateParams.companyId);
            }
            else {
              $timeout(function () {
                $state.go('chat.main', {})
              }, 0);
            }
          },
          currentDepartmentId: /* @ngInject */ function ($stateParams, $state, UserSvc, GroupSvc, CompanySvc, $timeout) {
            if ($stateParams && $stateParams.companyId && $stateParams.departmentId) {
              return $stateParams.departmentId;
            }
            else {
              $timeout(function () {
                $state.go('chat.main', {})
              }, 0);
            }
          }
        }
      })
      .state('chat.company', {
        url: '/main',
        templateUrl: 'components/chatMainComapny/chatMainComapny.html',
        roles: ['client', 'employee', 'admin', 'manager'],
        controller: 'chatMainCompanyCtrl',
        controllerAs: 'vm',
        authenticate: true,
        abstract: true
      })
      .state('chat.company.main', {
        url: '/main',
        templateUrl: 'components/chatMainEmpty/chatMainEmpty.html',
        roles: ['client', 'employee', 'admin', 'manager'],
        controllerAs: 'vm',
        authenticate: true
      });
  })
  .run(function ($rootScope) {
    $rootScope.isFullscreen = false;
    $rootScope.showSidebar = true;

    // TODO: get current user
    $rootScope.currentUser = {
      name: 'Israel Israeli',
      status: 'live',
      statusMsg: 'Hello world',
      img: 'assets/images/user.png'
    };
  });
