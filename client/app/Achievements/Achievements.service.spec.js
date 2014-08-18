'use strict';

describe('Service: Achievements', function () {

  // load the service's module
  beforeEach(module('onigiriApp'));

  // instantiate service
  var Achievements;
  beforeEach(inject(function (_Achievements_) {
    Achievements = _Achievements_;
  }));

  it('should do something', function () {
    expect(!!Achievements).toBe(true);
  });

});
