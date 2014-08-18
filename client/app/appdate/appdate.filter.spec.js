'use strict';

describe('Filter: appdate', function () {

  // load the filter's module
  beforeEach(module('onigiriApp'));

  // initialize a new instance of the filter before each test
  var appdate;
  beforeEach(inject(function ($filter) {
    appdate = $filter('appdate');
  }));

  it('should return the input prefixed with "appdate filter:"', function () {
    var text = 'angularjs';
    expect(appdate(text)).toBe('appdate filter: ' + text);
  });

});
