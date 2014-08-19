'use strict';

angular.module('onigiriApp')
  .factory('Player', function (Money, Time, Onigiri, Log) {
    var basePrice = 100;

    function addNew(){
      var len = Player.total;
      Player.members[0]++;
      return;
      Log.add(
        '[新入部員加入]',
        '部員： ' + len + '人→' + (len+1) + '人'
//        'panel-info'
      );
    }
    //全メンバーの中からランダムで退部
    function dropout(){
      var len = Player.total;
      if(len == 0){
        return;
      }
      var i = Math.floor(len * Math.random());
      for(var g = 0; g < 3; g++){
        var m = Player.members[g];
        if(i < m){
          Player.members[g]--;
          Log.add(
            'おにぎり不足により',
            '＿人人人人人人人＿<br>＞　突然の退部　＜<br>￣Y^Y^Y^Y^Y^Y￣' //<br>'+ '部員： ' + len +'人→' + (len-1) + '人'
          )
          return;
        }
        i -= m;
      }
    }
    var Player = {
      onigiriPerPlayer : 5,
      members : [0,0,0],
//        Math.floor(Math.random()*5)+3,
//        Math.floor(Math.random()*5)+3,
//        Math.floor(Math.random()*5)+3
//      ],
      moral : Math.random(),
      supplyRate: 0,
      array: function(index){
        var ary = [];
        for(var i = 0; i < this.members[index]; i++){
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
        return (Money.count < this.buyPrice) ? false : true;
      },
      get onigiriNeeds(){
        return Math.ceil(this.total * this.onigiriPerPlayer);
      },
      buy: function(){
        Money.count -= this.buyPrice;
        this.members[0] += 1;
      },
      nextYear: function(){
        this.members.pop();
        this.members.unshift(0);
      },
      //毎ターンの処理
      run : function(){
        //部員ゼロの場合
        if(this.onigiriNeeds == 0){
          this.supplyRate = 0;
          if(0 < Onigiri.count){
            addNew();
          }
          return;
        }
        var needs = this.onigiriNeeds;
        if(Time.date.getDay() == 0 || Time.date.getDay() == 6){
          needs *= 2;
        }

        var supply = Onigiri.count / needs;
        this.supplyRate = supply;
        if(supply > 1){
          addNew();
          return;
        }
        //供給欠乏度により退部判定
        var lack = 1 - supply;
        if(Math.random() < Math.pow(lack,3)){
          dropout();
        }

      }
    }

    return Player;
  });
