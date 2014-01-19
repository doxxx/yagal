/* globals defineFitnessClass: false */

describe('A Fitness', function() {
  describe('class', function() {
    var MyFitness = defineFitnessClass([1.0, 0.5]);

    it('can be defined with weights', function() {
      expect(MyFitness.prototype.weights).toEqual([1.0, 0.5]);
    });

    it('can be instantiated with values', function() {
      var f = new MyFitness([[50, 60]]);
      expect(f.values()).toEqual([[50, 60]]);
    });
  });

  describe('instance', function() {
    var MyFitness = defineFitnessClass([1.0, 0.5]);
    var f1 = new MyFitness([[50, 60]]);

    it('should compare as equal to itself', function() {
      expect(f1.eq(f1)).toBe(true);
    });

    it('should compare as equal to another instance with the same values', function() {
      var f2 = new MyFitness([[50, 60]]);
      expect(f1.eq(f2)).toBe(true);
    });

    it('should compare as less than another instance with higher values', function() {
      var f2 = new MyFitness([[60, 60]]);
      expect(f1.lt(f2)).toBe(true);
    });

    it('should compare greater than another instance with lower values', function() {
      var f2 = new MyFitness([[40, 60]]);
      expect(f1.gt(f2)).toBe(true);
    });
  });
});
