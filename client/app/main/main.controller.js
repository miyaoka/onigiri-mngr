'use strict';

angular.module('onigiriApp')
  .controller('MainCtrl', function ($scope, Money, Rice, Manager, Player, Onigiri, Time, $timeout, toaster) {

    $scope.jpDays = '日月火水木金土日'.split('');
    $scope.money = Money;
    $scope.rice = Rice;
    $scope.manager = Manager;
    $scope.player = Player;
    $scope.onigiri = Onigiri;
    $scope.time = Time;

    $timeout(function(){
//      toaster.pop('info', "スタート", "おにぎり供給率を満たしつつ部員を増やしていきましょう");
    }, 1000);


    var loop = function(){
      $timeout(function(){
        var date = Time.date;
        Time.nextDay();

        //進級処理
        if(Time.date.getMonth() == 3 && date.getMonth() != 3){
          Manager.nextYear();
          Player.nextYear();

          toaster.pop('info', "新年度", "進級しました。メンバー構成を確認しましょう");
        }

        if(Time.date.getDay() == 0){
          Player.game();
        }

        Manager.run();
        Player.run();
        loop();
      }, 1000);
    };
    loop();


  });