'use strict';

describe('Service: Manager', function () {

  // load the service's module
  beforeEach(module('onigiriApp'));

  // instantiate service
  var Manager;
  beforeEach(inject(function (_Manager_) {
    Manager = _Manager_;
  }));

  it('should do something', function () {
    expect(!!Manager).toBe(true);
  });

});
