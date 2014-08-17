'use strict';

angular.module('onigiriApp')
  .factory('Rice', function (Money) {
    var MaxSupplySize =  10000 * 1000;
    var supplySize =  10000 * 1000;
    var dealSize = 100 * 1000;
    //g当たりの価格
    var dealPrice = .2;
    var buyMargin = 1.2;
    var sellMargin = .8;

    var Rice = {
      value : 0 * 1000,
      get array(){
        var ary = [];
        //60kg単価
        var len = Math.ceil(this.value/60000);
        for(var i = 0; i < len; i++){
          ary.push(i);
        }
        return ary;
      },
      get supplyRate(){
        return supplySize / MaxSupplySize;
      },
      get marketPrice(){
        // 底が.75の対数値
        // rest 1 = 0, .75 = 1, .05 = 10.41
        return dealPrice;// * (1 + Math.log(this.supplyRate) / Math.log(.5));
      },
      get buyPrice(){
        return this.marketPrice * buyMargin;
      },
      get sellPrice(){
        return this.marketPrice * sellMargin;
      },
      canBuy: function(num){
        return (Money.value < (this.buyPrice * num)) ? false : true;
      },
      buy: function(num){
        Money.value -= this.buyPrice * num;
        supplySize -= num;
        this.value += num;
      }
    }

    return Rice;
  });
