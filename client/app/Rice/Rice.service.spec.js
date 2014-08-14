'use strict';

describe('Service: Rice', function () {

  // load the service's module
  beforeEach(module('onigiriApp'));

  // instantiate service
  var Rice;
  beforeEach(inject(function (_Rice_) {
    Rice = _Rice_;
  }));

  it('should do something', function () {
    expect(!!Rice).toBe(true);
  });

});
