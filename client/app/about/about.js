'use strict';

angular.module('onigiriApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.about', {
        url: '/about',
        templateUrl: 'app/about/about.html',
        controller: 'AboutCtrl'
      });
  });