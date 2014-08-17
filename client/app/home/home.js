'use strict';

angular.module('onigiriApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.home', {
        url: '/',
        templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl'
      });
  });