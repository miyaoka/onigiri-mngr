'use strict';

angular.module('onigiriApp')
  .filter('appdate', function ($filter) {
    var jpDays = '日月火水木金土日'.split('');

    return function (date) {
//      {{time.date | date: 'yyyy年MM月dd日'}}({{jpDays[time.date.getDay()]}})
      return [
        (date.getFullYear() % 10),
        $filter('date')(date, '年目MM月dd日'),
        '(', jpDays[date.getDay()], ')'
      ].join('');
    };
  });
