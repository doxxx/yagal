var yagal_tools = (function() {
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

  function selRandom(individuals, k) {
    var r = [];
    for (var i = 0; i < k; i++) {
      r.push(individuals[Math.floor(Math.random() * individuals.length)]);
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

  function cxOnePoint(ind1, ind2) {
    var size = Math.min(ind1.length, ind2.length);
    var cxPoint = Math.floor(Math.random() * size);
    var ind1Gene = ind1[cxPoint];
    ind1[cxPoint] = ind2[cxPoint];
    ind2[cxPoint] = ind1Gene;
    return [ind1, ind2];
  }

  return {
    initRepeat: initRepeat,
    initIterate: initIterate,
    maxByFitness: maxByFitness,
    selRandom: selRandom,
    selTournament: selTournament,
    cxOnePoint: cxOnePoint,
  };
}());
