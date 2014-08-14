'use strict';

angular.module('onigiriApp')
  .factory('Manager', function (Money, Onigiri) {
    var basePrice = 5000;

    //マネージャー一人当たりのおにぎり作成平均値
    var OnigiriMu = 40;
    //マネージャー一人当たりのおにぎり作成標準偏差
    var OnigiriSigma = 5;

    function nrMinMax(mu, sigma, min, max){
      var r = normRand() * sigma + mu;
      if(min > r){
        r = min;
      }
      if(max < r){
        r = max;
      }
      return r;
    }
    function normRand() {
      var x1, x2, rad;

      do {
        x1 = 2 * Math.random() - 1;
        x2 = 2 * Math.random() - 1;
        rad = x1 * x1 + x2 * x2;
      } while(rad >= 1 || rad == 0);

      var c = Math.sqrt(-2 * Math.log(rad) / rad);

      return x1 * c;
    };

    var Manager = {
      members : [0,1,0],
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
      buy: function(){
        Money.value -= this.buyPrice;
        this.members[0] += 1;
      },
      nextYear: function(){
        this.members.pop();
        this.members.unshift(0);
      },
      run: function(){
        var onigiris = 0;
        for(var i = 0; i < this.total; i++){
          onigiris += Math.floor(nrMinMax(OnigiriMu, OnigiriSigma,0));
        }
        Onigiri.make(onigiris);

      }
    }

    return Manager;
  });
