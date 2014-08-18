'use strict';

angular.module('onigiriApp')
  .controller('HomeCtrl', function ($scope, Money, Rice, Manager, Player, Onigiri, Time, $timeout, Log, Achievements) {

    $scope.money = Money;
    $scope.rice = Rice;
    $scope.manager = Manager;
    $scope.player = Player;
    $scope.onigiri = Onigiri;
    $scope.log = Log;
    $scope.achieve = Achievements;

    $scope.removeManager = function(grade){
      Manager.remove(grade);
    }

  });