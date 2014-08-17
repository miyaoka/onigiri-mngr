'use strict';

angular.module('onigiriApp')
  .factory('Log', function (Time) {
    var Log= {
      max:5,
      array: [],
      add: function(title, body, theme){
        var log = {
          title: title,
          body: body,
          theme: theme,
          date: Time.date
        }
        this.array.unshift(log);
        while(this.array.length > this.max){
          this.array.pop();
        }
      }
    }

    return Log;
  });
