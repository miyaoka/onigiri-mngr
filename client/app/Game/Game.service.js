'use strict';

angular.module('onigiriApp')
  .factory('Game', function (Util, Player, Log, Money, $filter) {
    var resultType = ['panel-success', 'panel-danger', 'panel-warning'];
    var resultStr = ['勝利', '敗北', '引き分け'];
    var resultMoney = [100000, 1000, 20000];
    var gameRanks = [
      '練習試合',
      '地区大会1回戦',
      '地区大会2回戦',
      '地区大会3回戦',
      '地区大会4回戦',
      '地区大会準々決勝',
      '地区大会準決勝',
      '地区大会決勝',
      '甲子園1回戦',
      '甲子園2回戦',
      '甲子園3回戦',
      '甲子園準々決勝',
      '甲子園準決勝',
      '甲子園決勝'
    ];
    var rank = 0;

    var Game = {
      //週末の試合
      game : function(){
        var scores = [[],[]];
        var totals = [0,0];
        for(var j = 0; j < 2; j++){
          for(var i = 0; i < 9; i++){
            //底が.5の対数。0.5で1、0.001で9.96
            var r = Math.random();
            var score = Math.min(9, Math.floor( Util.logb(.3, Math.pow(r,1) )));
            scores[j][i] = score;
            totals[j] += score;
          }
        }

        //0:win, 1:lose, 2:draw
        var result = (totals[1] > totals[0]) ? 0 : (totals[1] < totals[0]) ? 1 : 2;
        var money = (result == 0) ? (Math.pow(2,rank)) * 10000 : 0;

        Money.value += money;
        Log.add(
          gameRanks[rank] + ' （' + resultStr[result] + '）',
          [
            ['敵軍', scores[0].join(' '), totals[0]].join(' | '),
            ['自軍', scores[1].join(' '), totals[1]].join(' | '),
            '+ ' + $filter('number')(money) + '円'
          ].join('<br>'),
          resultType[result]
        );

        if(result == 0){
          rank = (rank + 1) % gameRanks.length;
        }
        else if(result == 1){
          rank = 0;
        }
      }
    };
    return Game;
  });
