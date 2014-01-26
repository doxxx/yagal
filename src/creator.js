function Creator() {
}

Creator.prototype.create = function(name, base, attrs) {
  var ctor = function() {
    base.apply(this, arguments);
  };

  ctor.prototype = Object.create(base.prototype);
  ctor.prototype.constructor = ctor;

  for (var attr in attrs) {
    var x = attrs[attr];
    if (typeof x === 'function') {
      /* jshint -W055 */
      x = new x();
    }
    ctor.prototype[attr] = x;
  }

  this[name] = ctor;

};
