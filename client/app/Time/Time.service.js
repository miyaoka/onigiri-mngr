'use strict';

angular.module('onigiriApp')
  .factory('Time', function () {
    var date = new Date(2000,3,1);
    var Time = {
      get date(){
        return new Date(date.getTime());
      },
      nextDay : function(){
        date.setTime(date.getTime()+86400*1000);
      }
    };
    return Time;
  });
