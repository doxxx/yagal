/* global yagal_fitness: false */

describe('A Fitness', function() {
  describe('class', function() {
    var MyFitness;

    beforeEach(function() {
      MyFitness = yagal_fitness.defineFitnessClass([1.0, 0.5]);
    });

    it('can be defined with weights', function() {
      expect(MyFitness.prototype.weights()).toEqual([1.0, 0.5]);
    });

    it('can be instantiated without values', function() {
      var f = new MyFitness();
      expect(f.values()).toBe(undefined);
      expect(f.weightedValues()).toBe(undefined);
    });

    it('can be instantiated with values', function() {
      var f = new MyFitness([50, 60]);
      expect(f.values()).toEqual([50, 60]);
    });
  });

  describe('instance', function() {
    var MyFitness;
    var f1;

    beforeEach(function() {
      MyFitness = yagal_fitness.defineFitnessClass([1.0, 0.5]);
      f1 = new MyFitness([50, 60]);
    });

    it('should be valid if it has the same number of values as weights', function() {
      expect(f1.valid()).toEqual(true);
    });

    it('should be invalid if it does not have the same number of values as weights', function() {
      var f2 = new MyFitness([]);
      expect(f2.valid()).toEqual(false);
      var f3 = new MyFitness([]);
      expect(f2.valid()).toEqual(false);
    });

    it('should have correctly weighted values', function() {
      expect(f1.weightedValues()).toEqual([50, 30]);
    });

    it('should compare as equal to itself', function() {
      expect(f1.eq(f1)).toBe(true);
    });

    it('should compare as equal to another instance with the same values', function() {
      var f2 = new MyFitness([50, 60]);
      expect(f1.eq(f2)).toBe(true);
    });

    it('should compare as less than another instance with higher values', function() {
      var f2 = new MyFitness([60, 60]);
      expect(f1.lt(f2)).toBe(true);
      var f3 = new MyFitness([50, 70]);
      expect(f1.lt(f3)).toBe(true);
    });

    it('should compare greater than another instance with lower values', function() {
      var f2 = new MyFitness([40, 60]);
      expect(f1.gt(f2)).toBe(true);
      var f3 = new MyFitness([50, 50]);
      expect(f1.gt(f3)).toBe(true);
    });

    it('should compare as greater than an invalid instance', function() {
      var f2 = new MyFitness([NaN, NaN]);
      expect(f1.gt(f2)).toEqual(true);
      expect(f2.lt(f1)).toEqual(true);
      expect(f1.lt(f2)).toEqual(false);
      expect(f2.gt(f1)).toEqual(false);
    });

    it('can have its values changed', function() {
      f1.setValues([100, 80]);
      expect(f1.values()).toEqual([100, 80]);
      expect(f1.weightedValues()).toEqual([100, 40]);
    });

    it('can have its values cleared', function() {
      f1.setValues([100, 80]);
      expect(f1.values()).toEqual([100, 80]);
      f1.clearValues();
      expect(f1.values()).toBe(undefined);
    });
  });
});
