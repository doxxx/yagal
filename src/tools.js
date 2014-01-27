function _newContainerWithArgs(container, args) {
  var instance = Object.create(container.prototype);
  var result = container.apply(instance, args);
  return typeof result === 'object' ? result : instance;
}

function initRepeat(container, func, n) {
  var values = [];
  for (var i = 0; i < n; i++) {
    values.push(func());
  }
  return _newContainerWithArgs(container, values);
}

function initIterate(container, generator) {
  return _newContainerWithArgs(container, generator());
}

function selRandom(individuals, k) {
  var r = [];
  for (var i = 0; i < k; i++) {
    r.push(individuals[Math.floor(Math.random() * individuals.length)]);
  }
  return r;
}

function maxByFitness(arr) {
  var r = null;
  for (var i = 0; i < arr.length; i++) {
    var e = arr[i];
    if (r === null || e.fitness.gt(r.fitness)) {
      r = e;
    }
  }
  return r;
}

function selTournament(individuals, size, k) {
  var r = [];
  for (var i = 0; i < k; i++) {
    var aspirants = selRandom(individuals, size);
    r.push(maxByFitness(aspirants));
  }
  return r;
}
