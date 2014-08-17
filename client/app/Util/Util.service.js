'use strict';

angular.module('onigiriApp')
  .service('Util', function () {
    this.logb = function(base, x){
      return Math.log( x ) / Math.log(base);
    };
    this.nrMinMax = function(mu, sigma, min, max){
      var r = this.normRand() * sigma + mu;
      if(min > r){
        r = min;
      }
      if(max < r){
        r = max;
      }
      return r;
    };
    this.normRand = function() {
      var x1, x2, rad;

      do {
        x1 = 2 * Math.random() - 1;
        x2 = 2 * Math.random() - 1;
        rad = x1 * x1 + x2 * x2;
      } while(rad >= 1 || rad == 0);

      var c = Math.sqrt(-2 * Math.log(rad) / rad);

      return x1 * c;
    };
  });
