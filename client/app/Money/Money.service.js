'use strict';

angular.module('onigiriApp')
  .factory('Money', function (Achievements) {
    var _count = 500000;
    var Money = {
      get count(){
        return _count;
      },
      set count(input){
        _count = input;

        if(_count < 1000000){ return }
          Achievements.unlock('money1');
        if(_count < 10000000){ return }
          Achievements.unlock('money2');
        if(_count < 100000000){ return }
          Achievements.unlock('money3');
      }
    };
    return Money;
  });
