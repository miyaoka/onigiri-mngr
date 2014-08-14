'use strict';

describe('Service: Onigiri', function () {

  // load the service's module
  beforeEach(module('onigiriApp'));

  // instantiate service
  var Onigiri;
  beforeEach(inject(function (_Onigiri_) {
    Onigiri = _Onigiri_;
  }));

  it('should do something', function () {
    expect(!!Onigiri).toBe(true);
  });

});
