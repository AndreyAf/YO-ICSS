(function () {

  'use strict';

  angular.module('icssApp').controller('chatMainEmptyCtrl', chatMainEmptyCtrl);

  // @ngInject
  function chatMainEmptyCtrl() {
    var vm = this; //jshint ignore:line

    vm.features = [{
      title: 'Add friends',
      icon: 'glyphicon glyphicon-user'
    }, {
      title: 'Add groups',
      icon: 'fa fa-users'
    }, {
      title: 'Add companies',
      icon: 'fa fa-briefcase'
    }, {
      title: 'Smart Search engine',
      icon: 'glyphicon glyphicon-star'
    }, {
      title: 'Black list',
      icon: 'glyphicon glyphicon-list'
    }];
  }
})();
