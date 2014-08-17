'use strict';

angular.module('onigiriApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.history', {
        url: '/history',
        templateUrl: 'app/history/history.html',
        controller: 'HistoryCtrl'
      });
  });