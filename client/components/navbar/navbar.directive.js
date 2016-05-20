'use strict';

/* @ngInject */
function navbarCtrl($location, Auth) {
  var vm = this;// jshint ignore: line

  vm.location = $location;
  vm.isCollapsed = true;
  vm.getCurrentUser = null;
  vm.isLoggedIn = false;
  vm.isAdmin = false;
  vm.menu = [{
    'title': 'Home',
    'state': 'main',
    'isVisible': true
  }, {
    'title': 'Services',
    'isVisible': true,
    'elementId': 'services'
  }, {
    'title': 'Technology',
    'isVisible': true,
    'elementId': 'technology'
  }, {
    'title': 'About us',
    'isVisible': true,
    'elementId': 'about_us'
  }, {
    'title': 'Contact us',
    'isVisible': true,
    'elementId': 'contact_us'
  }];

  function activate() {
    Auth.getCurrentUser(function (user) {
        vm.isLoggedIn = user !== null;
        vm.currentUser = user;

        if (vm.isLoggedIn) {
          for (var i in user.roles) {
            if (user.roles[i] === 'admin') {
              vm.isAdmin = true;
              break;
            }
            if (user.roles[i] === 'employee') {
              vm.isEmployee = true;
              break;
            }
          }

          vm.menu.push({
            'title': 'Chat',
            'state': 'chat.main',
            'isVisible': vm.isLoggedIn
            //,
            //'target': '_blank'
            //
          });

          vm.menu.push({
            'title': 'Admin',
            'state': 'admin.users.list',
            'isVisible': vm.isAdmin
          });

          vm.menu.push({
            'title': 'Employee',
            'state': 'employee',
            'isVisible': vm.isAdmin || vm.isEmployee
          });
        }
      }
    );
  }

  activate();
}

function navbar() {
  return {
    templateUrl: 'components/navbar/navbar.html',
    restrict: 'E',
    controller: navbarCtrl,
    controllerAs: 'vm'
  };
}

angular.module('icssApp').directive('navbar', navbar);



