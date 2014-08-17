'use strict';

angular.module('onigiriApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });