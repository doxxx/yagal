'use strict';

function assert(condition, message) {
  if (!condition) {
    throw message || 'Assertion failed';
  }
}

function superTypeOf(x) {
  if (Array.isArray(x)) {
    return 'array';
  }
  else {
    return typeof x;
  }
}

function clone(x) {
  var seen = {};
  function _clone(x) {
    for (var s in seen) {
      if (s === x) {
        return seen[s];
      }
    }
    switch(superTypeOf(x)) {
      case 'object':
        var newObject = Object.create(Object.getPrototypeOf(x));
        seen[x] = newObject;
        for (var p in x) {
          newObject[p] = _clone(x[p]);
        }
        return newObject;
      case 'array':
        var newArray = [];
        seen[x] = newArray;
        for (var i = 0; i < x.length; i++) {
          newArray.push(x[i]);
        }
        return newArray;
      case 'number':
        return x;
      case 'string':
        return x;
      case 'boolean':
        return x;
      default:
        return x;
    }
  }
  return _clone(x);
}

function map(fn, arr) {
  return arr.map(fn);
}

function Toolbox() {
  this.clone = clone;
  this.map = map;
  return this;
}

Toolbox.prototype.register = function(name, fn) {
  var args = Array.prototype.slice.call(arguments, 2);
  this[name] = function() {
    var finalArgs = args.concat(Array.prototype.slice.call(arguments));
    return fn.apply(null, finalArgs);
  };
};

Toolbox.prototype.unregister = function(name) {
  delete this[name];
};
