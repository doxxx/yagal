/* globals initRepeat, initIterate: false */

describe('The initRepeat function', function() {
  it('should create a container with the values returned from N invocations of a function', function() {
    var f = function() {
      return 1;
    };
    var arr = initRepeat(Array, f, 3);
    expect(arr).toEqual([1, 1, 1]);
  });
});

describe('The initIterate function', function() {
  it('should create a container with the iterable values returned from the invocation of a generator function', function() {
    var f = function() {
      return [1, 2, 3];
    };
    var arr = initIterate(Array, f);
    expect(arr).toEqual([1, 2, 3]);
  });
});
