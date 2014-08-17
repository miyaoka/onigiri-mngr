'use strict';

describe('Service: Util', function () {

  // load the service's module
  beforeEach(module('onigiriApp'));

  // instantiate service
  var Util;
  beforeEach(inject(function (_Util_) {
    Util = _Util_;
  }));

  it('should do something', function () {
    expect(!!Util).toBe(true);
  });

});
