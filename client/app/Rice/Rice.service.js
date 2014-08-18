'use strict';

angular.module('onigiriApp')
  .factory('Rice', function (Money, Achievements) {
    var MaxSupplySize =  10000 * 1000;
    var supplySize =  10000 * 1000;
    var dealSize = 100 * 1000;
    //g当たりの価格
    var dealPrice = .2;
    var buyMargin = 1.2;
    var sellMargin = .8;

    //アイコン一つ当たりの米容量
    var iconSmall = 60000;
    var iconLarge = iconSmall * 50;

    var Rice = {
      count : 0 * 1000,
      get largeCount(){
        return Math.floor(this.count / iconLarge);
      },
      get smallCount(){
        return Math.ceil((this.count % iconLarge) / iconSmall);
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
        return (Money.count < (this.buyPrice * num)) ? false : true;
      },
      buy: function(num){
        Money.count -= this.buyPrice * num;
        supplySize -= num;
        this.count += num;

        Achievements.unlock('rice1');
        if(this.count < 3000 * 1000){ return }
          Achievements.unlock('rice2');
        if(this.count < 6000 * 1000){ return }
          Achievements.unlock('rice3');
        if(this.count < 9000 * 1000){ return }
          Achievements.unlock('rice4');
        if(this.count < 12000 * 1000){ return }
          Achievements.unlock('rice5');
        if(this.count < 15000 * 1000){ return }
          Achievements.unlock('rice6');
      }
    }

    return Rice;
  });
