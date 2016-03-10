'use strict';

angular.module('icssApp').directive('navbar', navbar);

function navbar() {

  return {
    templateUrl: 'components/navbar/navbar.html',
    restrict: 'E',
    controller: navbarCtrl,
    controllerAs: 'vm'
  };

  /* @ngInject */
  function navbarCtrl($location, Auth) {

    var vm = this;

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

    activate();

    function activate() {
      Auth.getCurrentUser(function (user) {
          vm.isLoggedIn = user !== null;
          vm.currentUser = user;

          if (vm.isLoggedIn) {
console.log(user);
            for (var i in user.roles) {
              console.log(i);
              console.log(user.roles[i]);
              if (user.roles[i] === 'admin') {
                vm.isAdmin = true;
                break;
              }
            }

            vm.menu.push({
              'title': 'Chat',
              'state': 'chat',
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
          }
        }
      );
    }
  }
}

