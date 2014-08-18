'use strict';

angular.module('onigiriApp')
  .factory('Onigiri', function (Rice) {
    //米(g)あたりのおにぎり個数
    var onigiriPerRice = 22.5 / 1000;
    var onigiriPerPlayer = 3;

    var Onigiri = {
      count : 0,
      consumped: 0,
      get array(){
        var ary = [];
        for(var i = 0; i < this.value/ onigiriPerPlayer; i++){
          ary.push(i);
        }
        return ary;
      },
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
      },
      reset: function(){
        this.count = 0;
      }
    };
    return Onigiri;
  });
