/* global yagal_creator: false */

describe('A Creator', function() {
  var creator;

  beforeEach(function() {
    creator = new yagal_creator.Creator();
  });

  it('can define a new class', function() {
    var ctor = function() {
      this.x = 123;
    };
    creator.create('Stuff', ctor);

    var s = new creator.Stuff();
    expect(s.x).toEqual(123);
  });

  it('can define a new class to which constructor arguments can be passed', function() {
    var ctor = function(x) {
      this.x = x;
    };
    creator.create('Stuff', ctor);

    var s = new creator.Stuff(123);
    expect(s.x).toEqual(123);
  });

  it('can define a new class with automatically defined attributes', function() {
    var ctor = function() {
    };
    creator.create('Stuff', ctor, {y: 'hello'});

    var s = new creator.Stuff(123);
    expect(s.y).toEqual('hello');
  });

  it('can define a new class with attributes that are initialized to new instances of another class', function() {
    var ctor = function() {
      this.x = 123;
    };
    creator.create('Stuff', ctor);

    var ctor2 = function() {
      this.y = 456;
    };
    creator.create('Stuff2', ctor2, {a: creator.Stuff});

    var s = new creator.Stuff2();
    expect(s.y).toEqual(456);
    expect(s.a.x).toEqual(123);
  });

  it('can define a new class based on the Array builtin', function() {
    creator.create('Stuff', Array, {foo: 123});
    var r = new creator.Stuff(1, 2, 3);
    expect(r.foo).toEqual(123);
    expect(r[0]).toEqual(1);
    expect(r[1]).toEqual(2);
    expect(r[2]).toEqual(3);
    expect(r.slice()).toEqual([1, 2, 3]); // can't compare directly to plain Array, since it's a different "class"
  });
});
