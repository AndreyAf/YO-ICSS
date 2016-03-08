'use strict';

angular.module('icssApp').controller('AdminSessionsCtrl', adminSessionsCtrl);

function adminSessionsCtrl(SessionSvc) {
  var vm = this;

  vm.sessions = [];

  activate();

  //////////

  function activate() {
    vm.sessions = SessionSvc.query();
  }
}
