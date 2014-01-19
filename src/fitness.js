function Fitness(values) {
  this.setValues(values);
}

Fitness.prototype.weights = function() {
  return this._weights;
};

Fitness.prototype.weightedValues = function() {
  return this._weightedValues;
};

Fitness.prototype.setValues = function(values) {
  if (this._weights === undefined) {
    throw 'Fitness class has no weights defined; use defineFitnessClass([weights...])';
  }

  var weighted = values.slice();

  for (var i = 0; i < weighted.length; i++) {
    weighted[i] = weighted[i] * this._weights[i];
  }

  this._weightedValues = weighted;

  return this;
};

Fitness.prototype.values = function() {
  if (this._weights === undefined) {
    throw 'Fitness class has no weights defined';
  }

  var unweighted = this._weightedValues.slice();

  for (var i = 0; i < unweighted.length; i++) {
    unweighted[i] = unweighted[i] / this._weights[i];
  }

  return unweighted;
};

Fitness.prototype.compare = function(other) {
  if (this._weightedValues.length !== other._weightedValues.length) {
    throw 'Cannot compare Fitnesses with differing lengths';
  }

  for (var i = 0; i < this._weightedValues.length; i++) {
    if (this._weightedValues[i] < other._weightedValues[i]) {
      return -1;
    }
    else if (this._weightedValues[i] > other._weightedValues[i]) {
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
  ctor.prototype._weights = weights;

  return ctor;
}
