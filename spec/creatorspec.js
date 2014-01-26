/* globals Creator: false */

describe('A Creator', function() {
  var creator;

  beforeEach(function() {
    creator = new Creator();
  });

  it('can define a new class', function() {
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
});
