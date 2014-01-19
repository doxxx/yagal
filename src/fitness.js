function Fitness(values) {
  this.setValues(values);
}

Fitness.prototype.setValues = function(values) {
  if (this.weights === undefined) {
    throw 'Fitness class has no weights defined; use defineFitnessClass([weights...])';
  }

  var weighted = values.slice();

  for (var i = 0; i < weighted.length; i++) {
    weighted[i] = weighted[i] * this.weights[i];
  }

  this.weightedValues = weighted;

  return this;
};

Fitness.prototype.values = function() {
  if (this.weights === undefined) {
    throw 'Fitness class has no weights defined';
  }

  var unweighted = this.weightedValues.slice();

  for (var i = 0; i < unweighted.length; i++) {
    unweighted[i] = unweighted[i] / this.weights[i];
  }

  return unweighted;
};

Fitness.prototype.compare = function(other) {
  if (this.weightedValues.length !== other.weightedValues.length) {
    throw 'Cannot compare Fitnesses with differing lengths';
  }

  for (var i = 0; i < this.weightedValues.length; i++) {
    if (this.weightedValues[i] < other.weightedValues[i]) {
      return -1;
    }
    else if (this.weightedValues[i] > other.weightedValues[i]) {
      return 1;
    }
  }

  return 0;
};

Fitness.prototype.eq = function(other) {
  return this.compare(other) === 0;
};

Fitness.prototype.lt = function(other) {
  return this.compare(other) < 0;
};

Fitness.prototype.gt = function(other) {
  return this.compare(other) > 0;
};

Fitness.prototype.lte = function(other) {
  return this.compare(other) <= 0;
};

Fitness.prototype.gte = function(other) {
  return this.compare(other) >= 0;
};

function defineFitnessClass(weights) {
  var ctor = function(values) {
    Fitness.call(this, values);
  };

  ctor.prototype = Object.create(Fitness.prototype);
  ctor.prototype.constructor = ctor;
  ctor.prototype.weights = weights;

  return ctor;
}
