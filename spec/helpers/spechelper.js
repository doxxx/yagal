function setupSeededRandom() {
  Math.seed = 1;
  Math._originalRandom = Math.random;
  Math.random = function(max, min) {
    max = max || 1;
    min = min || 0;

    Math.seed = (Math.seed * 9301 + 49297) % 233280;
    var rnd = Math.seed / 233280;

    return min + rnd * (max - min);
  };
}

function teardownSeededRandom() {
  delete Math.seed;
  Math.random = Math._originalRandom;
  delete Math._originalRandom;
}
