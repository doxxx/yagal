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
