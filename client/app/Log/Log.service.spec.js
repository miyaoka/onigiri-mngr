'use strict';

describe('Service: Log', function () {

  // load the service's module
  beforeEach(module('onigiriApp'));

  // instantiate service
  var Log;
  beforeEach(inject(function (_Log_) {
    Log = _Log_;
  }));

  it('should do something', function () {
    expect(!!Log).toBe(true);
  });

});
