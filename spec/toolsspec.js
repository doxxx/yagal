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

describe('The mutShuffleIndexes function', function() {
  it('should shuffle the indexes of the input', function() {
    setupSeededRandom();
    var ind = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    yagal_tools.mutShuffleIndexes(0.2, ind);
    expect(ind).toEqual([1, 2, 3, 4, 5, 10, 7, 8, 9, 6]);
    teardownSeededRandom();
  });
  it('should be affected by the probability', function() {
    setupSeededRandom();
    var ind = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    yagal_tools.mutShuffleIndexes(0, ind);
    expect(ind).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    yagal_tools.mutShuffleIndexes(1, ind);
    expect(ind).toEqual([8, 5, 2, 4, 10, 3, 7, 9, 1, 6]);
    teardownSeededRandom();
  });
});

describe('A HallOfFame', function() {
  var FitnessClass = yagal_fitness.defineFitnessClass([1.0]);
  var hof;

  beforeEach(function() {
    hof = new yagal_tools.HallOfFame(5);
  });

  it('should sort individuals highest to lowest fitness', function() {
    var i1 = { fitness: new FitnessClass([10]) };
    var i2 = { fitness: new FitnessClass([20]) };
    var i3 = { fitness: new FitnessClass([30]) };
    hof.update([i2, i1, i3]);
    expect(hof.entries[0]).toBe(i3);
    expect(hof.entries[1]).toBe(i2);
    expect(hof.entries[2]).toBe(i1);

    var i4 = { fitness: new FitnessClass([15]) };
    var i5 = { fitness: new FitnessClass([25]) };
    hof.update([i4, i5]);
    expect(hof.entries[0]).toBe(i3);
    expect(hof.entries[1]).toBe(i5);
    expect(hof.entries[2]).toBe(i2);
    expect(hof.entries[3]).toBe(i4);
    expect(hof.entries[4]).toBe(i1);
  });

  it('should keep the best individuals up to the maxSize', function() {
    var i1 = { fitness: new FitnessClass([10]) };
    var i2 = { fitness: new FitnessClass([20]) };
    var i3 = { fitness: new FitnessClass([30]) };
    var i4 = { fitness: new FitnessClass([15]) };
    var i5 = { fitness: new FitnessClass([25]) };
    hof.update([i1, i2, i3, i4, i5]);

    var i6 = { fitness: new FitnessClass([5]) };
    hof.update([i6]);
    expect(hof.entries.length).toEqual(5);
    expect(hof.entries[0]).toBe(i3);
    expect(hof.entries[1]).toBe(i5);
    expect(hof.entries[2]).toBe(i2);
    expect(hof.entries[3]).toBe(i4);
    expect(hof.entries[4]).toBe(i1);

    var i7 = { fitness: new FitnessClass([35]) };
    hof.update([i7]);
    expect(hof.entries.length).toEqual(5);
    expect(hof.entries[0]).toBe(i7);
    expect(hof.entries[1]).toBe(i3);
    expect(hof.entries[2]).toBe(i5);
    expect(hof.entries[3]).toBe(i2);
    expect(hof.entries[4]).toBe(i4);
  });
});
