'use strict';

angular.module('onigiriApp')
  .controller('MainCtrl', function ($scope, Time, Manager, Player, $timeout, Onigiri, Log, Game) {

    $scope.version = 'v1.0.0 (2014.08.15)';

    $scope.time = Time;
    $scope.jpDays = '日月火水木金土日'.split('');

    Log.add(
      'スタート',
      '米を購入し、マネージャーを雇っておにぎりを供給しましょう。部員が集まれば試合に出場するようになります',
      'panel-info'
    );


    var onFrame = function(){
      $timeout(function(){
        var date = Time.date;
        Time.nextDay();

        //進級処理
        if(Time.date.getMonth() == 3 && date.getMonth() != 3){
          Manager.nextYear();
          Player.nextYear();

    Log.add(
      '新年度',
      '進級しました。メンバー構成を確認しましょう',
      'panel-info'
    );
//          toaster.pop('info', "新年度", "進級しました。メンバー構成を確認しましょう");
        }

        if(Time.date.getDay() == 0 && 9 <= Player.total){
          Game.game();
        }

        Manager.run();
        Player.run();

        onFrame();
      }, 1000 * .75);
    };
    onFrame();


  });