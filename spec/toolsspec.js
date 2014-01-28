/* global yagal_creator, yagal_fitness, yagal_tools, setupSeededRandom, teardownSeededRandom: false */

describe('The initRepeat function', function() {
  it('should create a container with the values returned from N invocations of a function', function() {
    var f = function() {
      return 1;
    };
    var arr = yagal_tools.initRepeat(Array, f, 3);
    expect(arr).toEqual([1, 1, 1]);
  });
});

describe('The initIterate function', function() {
  it('should create a container with the iterable values returned from the invocation of a generator function', function() {
    var f = function() {
      return [1, 2, 3];
    };
    var arr = yagal_tools.initIterate(Array, f);
    expect(arr).toEqual([1, 2, 3]);
  });
});

describe('The selRandom function', function() {
  it('should select N random elements from an array', function() {
    var arr = [1, 2, 3, 4, 5];
    var r = yagal_tools.selRandom(arr, 10);
    expect(r.every(function(e) { return arr.indexOf(e) >= 0; })).toBe(true);
    var r2 = yagal_tools.selRandom(arr, 10);
    expect(r2).not.toEqual(r);
  });
});

describe('The maxByFitness function', function() {
  it('should return the object with the greatest fitness', function() {
    var creator = new yagal_creator.Creator();
    creator.create('FitnessMax', yagal_fitness.defineFitnessClass([1.0]));
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
    var max = yagal_tools.maxByFitness(arr);
    expect(max.fitness.values()).toEqual([20]);
  });

  it('should return the object with the greatest fitness (negative weight)', function() {
    var creator = new yagal_creator.Creator();
    creator.create('FitnessMax', yagal_fitness.defineFitnessClass([-1.0]));
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
    var max = yagal_tools.maxByFitness(arr);
    expect(max.fitness.values()).toEqual([-20]);
  });
});

describe('The selTournament function', function() {
  it('should select N winners from N tournament rounds consisting of M random individuals', function() {
    setupSeededRandom();
    var creator = new yagal_creator.Creator();
    creator.create('FitnessMax', yagal_fitness.defineFitnessClass([1.0]));
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
    var winners = yagal_tools.selTournament(arr, 2, 5);
    expect(winners[0].fitness.values()).toEqual([20]);
    expect(winners[1].fitness.values()).toEqual([5]);
    expect(winners[2].fitness.values()).toEqual([10]);
    expect(winners[3].fitness.values()).toEqual([20]);
    expect(winners[4].fitness.values()).toEqual([20]);
    teardownSeededRandom();
  });
});

describe('The cxOnePoint function', function() {
  it('should swap the genes at a random point in two indviduals', function() {
    setupSeededRandom();
    var ind1 = [1, 2, 3, 4];
    var ind2 = [5, 6, 7, 8];
    yagal_tools.cxOnePoint(ind1, ind2);
    expect(ind1).toEqual([1, 6, 3, 4]);
    expect(ind2).toEqual([5, 2, 7, 8]);
    teardownSeededRandom();
  });

  it('should work with individuals of different lengths', function() {
    setupSeededRandom();
    var ind1 = [1, 2, 3, 4, 5, 6, 7];
    var ind2 = [5, 6, 7, 8];
    yagal_tools.cxOnePoint(ind1, ind2);
    expect(ind1).toEqual([1, 6, 3, 4, 5, 6, 7]);
    expect(ind2).toEqual([5, 2, 7, 8]);
    teardownSeededRandom();
  });
});
