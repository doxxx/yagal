/* globals initRepeat, initIterate, selRandom, Creator, maxByFitness, Fitness: false */

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

describe('The selRandom function', function() {
  it('should select N random elements from an array', function() {
    var arr = [1, 2, 3, 4, 5];
    var r = selRandom(arr, 10);
    expect(r.every(function(e) { return arr.indexOf(e) >= 0; })).toBe(true);
    var r2 = selRandom(arr, 10);
    expect(r2).not.toEqual(r);
  });
});

describe('The maxByFitness function', function() {
  it('should return the object with the greatest fitness', function() {
    var creator = new Creator();
    creator.create('FitnessMax', Fitness, { _weights: [1.0] });
    var arr = [
      { fitness: new creator.FitnessMax() },
      { fitness: new creator.FitnessMax() },
      { fitness: new creator.FitnessMax() },
      { fitness: new creator.FitnessMax() }
    ];
    arr[0].fitness.setValues([10]);
    arr[1].fitness.setValues([5]);
    arr[2].fitness.setValues([20]);
    arr[3].fitness.setValues([1]);
    var max = maxByFitness(arr);
    expect(max.fitness.values()).toEqual([20]);
  });

  it('should return the object with the greatest fitness (negative weight)', function() {
    var creator = new Creator();
    creator.create('FitnessMax', Fitness, { _weights: [-1.0] });
    var arr = [
      { fitness: new creator.FitnessMax() },
      { fitness: new creator.FitnessMax() },
      { fitness: new creator.FitnessMax() },
      { fitness: new creator.FitnessMax() }
    ];
    arr[0].fitness.setValues([-10]);
    arr[1].fitness.setValues([-5]);
    arr[2].fitness.setValues([-20]);
    arr[3].fitness.setValues([-1]);
    var max = maxByFitness(arr);
    expect(max.fitness.values()).toEqual([-20]);
  });
});
