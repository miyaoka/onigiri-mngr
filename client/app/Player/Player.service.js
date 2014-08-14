'use strict';

angular.module('onigiriApp')
  .factory('Player', function (Money, Time, Onigiri, toaster) {
    var basePrice = 100;
    var onigiriPerPlayer = 2;

    var resultType = ['success', 'error', 'warning'];
    var resultStr = ['勝利', '敗北', '引き分け'];
    var resultMoney = [100000, 1000, 20000];

    var Player = {
      members : [
        Math.floor(Math.random()*5)+3,
        Math.floor(Math.random()*5)+3,
        Math.floor(Math.random()*5)+3
      ],
      moral : Math.random(),
      supplyRate: 0,
      get array(){
        var ary = [];
        for(var i = 0; i < this.total; i++){
          ary.push(i);
        }
        return ary;
      },
      get total(){
        return this.members[0] + this.members[1] + this.members[2];
      },
      get buyPrice(){
        return basePrice * (this.total + 1);
      },
      get canBuy(){
        return (Money.value < this.buyPrice) ? false : true;
      },
      get onigiriNeeds(){
        return Math.ceil(this.total * onigiriPerPlayer);
      },
      buy: function(){
        Money.value -= this.buyPrice;
        this.members[0] += 1;
      },
      nextYear: function(){
        this.members.pop();
        this.members.unshift(0);
      },
      //毎ターンの処理
      run : function(){
        var supply = Onigiri.value / this.onigiriNeeds;
        this.supplyRate = supply;
        if(supply > 1){
          this.moral += .01;
          return;
        }
        this.moral -= .01;

      },
      //週末の試合
      game : function(){
        var scores = [[],[]];
        var totals = [0,0];
        for(var j = 0; j < 2; j++){
          for(var i = 0; i < 9; i++){
            //底が.5の対数。0.5で1、0.001で9.96
            var score = Math.min(9, Math.floor( Math.log( Math.random() ) / Math.log(.4) ));
            scores[j][i] = score;
            totals[j] += score;
          }
        }

        //0:win, 1:lose, 2:draw
        var result = (totals[1] > totals[0]) ? 0 : (totals[1] < totals[0]) ? 1 : 2;

        Money.value += resultMoney[result];

        toaster.pop(
          resultType[result],
          '練習試合' + ' （' + resultStr[result] + '）',
          [
            ['敵軍', scores[0].join(' '), totals[0]].join(' | '),
            ['自軍', scores[1].join(' '), totals[1]].join(' | '),
            '+' + resultMoney[result] + '円'
          ].join('<br>'),
          5000, 'trustedHtml'
        );
      }
    }

    return Player;
  });
