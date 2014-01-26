/* globals defineFitnessClass: false */

describe('A Fitness', function() {
  describe('class', function() {
    var MyFitness = defineFitnessClass([1.0, 0.5]);

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
    var MyFitness = defineFitnessClass([1.0, 0.5]);
    var f1 = new MyFitness([50, 60]);

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

    it('can have its values changed', function() {
      f1.setValues([100, 80]);
      expect(f1.values()).toEqual([100, 80]);
      expect(f1.weightedValues()).toEqual([100, 40]);
    });
  });
});
