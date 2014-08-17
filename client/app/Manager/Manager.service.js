'use strict';

angular.module('onigiriApp')
  .factory('Manager', function (Money, Onigiri, Util) {
    //base^n * const
    var constPrice = 10000;
    var basePrice = 1.5;

    //マネージャー一人当たりのおにぎり作成平均値
    var OnigiriMu = 30;
    //マネージャー一人当たりのおにぎり作成標準偏差
    var OnigiriSigma = 5;

    var Manager = {
      members : [0,0,0],
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
        return Math.pow(basePrice, this.total) * constPrice;
      },
      get canBuy(){
        return (Money.value < this.buyPrice) ? false : true;
      },
      buy: function(){
        Money.value -= this.buyPrice;
        this.members[0] += 1;
      },
      nextYear: function(){
        this.members.pop();
        this.members.unshift(0);
      },
      //本日の作成可能おにぎり数
      run: function(){
        var onigiris = 0;
        for(var i = 0; i < this.total; i++){
          onigiris += Math.floor(Util.nrMinMax(OnigiriMu, OnigiriSigma,0));
        }
        Onigiri.make(onigiris);
      }
    }

    return Manager;
  });
