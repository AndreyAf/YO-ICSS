'use strict';
(function() {

function MainController(Auth) {
  var self = this;

  this.isLoggedIn = function(){
    return Auth.isLoggedIn;
  };
}

angular.module('icssApp')
  .controller('MainController', MainController);

})();
