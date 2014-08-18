'use strict';

angular.module('onigiriApp')
  .factory('Manager', function (Money, Onigiri, Util, Achievements) {
    //base^n * const
    var constPrice = 10000;
    var basePrice = 1.5;

    //マネージャー一人当たりのおにぎり作成平均値
    var OnigiriMu = 30;
    //マネージャー一人当たりのおにぎり作成標準偏差
    var OnigiriSigma = 5;

    var Manager = {
      members : [0,0,0],
      get total(){
        return this.members[0] + this.members[1] + this.members[2];
      },
      get buyPrice(){
        return Math.pow(basePrice, this.total) * constPrice;
      },
      get canBuy(){
        return (Money.count < this.buyPrice) ? false : true;
      },
      buy: function(){
        Money.count -= this.buyPrice;
        this.members[0] += 1;

        Achievements.unlock('mgr1');
        if(this.total < 10){ return }
          Achievements.unlock('mgr2');
        if(this.total < 20){ return }
          Achievements.unlock('mgr3');
      },
      remove: function(grade){
        this.members[grade]--;
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
