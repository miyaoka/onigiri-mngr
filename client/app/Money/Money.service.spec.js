'use strict';

describe('Service: Money', function () {

  // load the service's module
  beforeEach(module('onigiriApp'));

  // instantiate service
  var Money;
  beforeEach(inject(function (_Money_) {
    Money = _Money_;
  }));

  it('should do something', function () {
    expect(!!Money).toBe(true);
  });

});
