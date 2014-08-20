'use strict';

angular.module('onigiriApp')
  .filter('appdate', function ($filter) {
    var jpDays = '日月火水木金土日'.split('');
    return function (date) {
      var day = date.getDay();
      return [
        date.getFullYear() - 2000,
        $filter('date')(date, '年目 M月d日'),
        '(<span class="day-', day, '">', jpDays[day], '</span>)'
      ].join('');
    };
  });
