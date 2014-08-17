'use strict';

angular.module('onigiriApp')
  .factory('Time', function () {
    var date = new Date(2014,3,1);
    var Time = {
      frame: 10,
      get date(){
        return new Date(date.getTime());
      },
      nextDay : function(){
        date.setTime(date.getTime()+86400*1000);
      },
      nextFrame : function(){
        date.setTime(date.getTime()+86400*1000 / this.frame);
      }
    };
    return Time;
  });
