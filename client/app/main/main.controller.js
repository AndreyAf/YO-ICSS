(function () {
  'use strict';

  /* @ngInject */
  function MainController(Auth) {
    var vm = this; // jshint ignore: line

    vm.isLoggedIn = Auth.isLoggedIn;

    vm.technologies = [
      {
        src: '../assets/images/home_page/AngularJS.png',
        title: 'AngularJS 1.x',
        desc: ''
      },
      {
        src: '../assets/images/home_page/github.png',
        title: 'GitHub',
        desc: ''
      },
      {
        src: '../assets/images/home_page/HTML5.png',
        title: 'HTML 5',
        desc: ''
      },
      {
        src: '../assets/images/home_page/css3.jpg',
        title: 'CSS 3',
        desc: ''
      },
      {
        src: '../assets/images/home_page/MongoDB.png',
        title: 'MongoDB',
        desc: ''
      },
      {
        src: '../assets/images/home_page/grunt.png',
        title: 'Grunt',
        desc: ''
      },
      {
        src: '../assets/images/home_page/NodeJS.png',
        title: 'NodeJS',
        desc: ''
      },
      {
        src: '../assets/images/home_page/WebRtc.png',
        title: 'WebRTC',
        desc: ''
      }
    ];
  }

  angular.module('icssApp').controller('MainController', MainController);

})();
