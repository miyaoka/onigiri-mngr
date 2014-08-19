'use strict';

angular.module('onigiriApp')
  .factory('Onigiri', function (Rice, Achievements) {
    //米(g)あたりのおにぎり個数
    var onigiriPerRice = 22.5 / 1000;

    var Onigiri = {
      count : 0,
      consumped: 0,
      make: function(onigiriNum){
        var riceNeeds = onigiriNum / onigiriPerRice;

        //米が足りなかったら作成可能な分だけ消費
        if(Rice.count < riceNeeds){
          onigiriNum = Math.floor(Rice.count * onigiriPerRice);
          riceNeeds = Rice.count;
        }

        this.count = onigiriNum;
        this.consumped += onigiriNum;
        Rice.count -= riceNeeds;

        if(this.consumped < 100000){ return }
          Achievements.unlock('onigiri1');
        if(this.consumped < 500000){ return }
          Achievements.unlock('onigiri2');
        if(this.consumped < 1000000){ return }
          Achievements.unlock('onigiri3');
        if(this.consumped < 5000000){ return }
          Achievements.unlock('onigiri4');
        if(this.consumped < 10000000){ return }
          Achievements.unlock('onigiri5');
      },
      reset: function(){
        this.count = 0;
      }
    };
    return Onigiri;
  });
