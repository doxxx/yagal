/* global yagal_toolbox: false */

describe('A Toolbox', function() {
  var toolbox;

  beforeEach(function() {
    toolbox = new yagal_toolbox.Toolbox();
  });

  it('can register a function', function() {
    var func = function() {
      return 'hello';
    };
    toolbox.register('func', func);
    expect(toolbox.func()).toEqual('hello');
  });

  it('can register a function which takes a parameter', function() {
    var func = function(s) {
      return 'hello ' + s;
    };
    toolbox.register('func', func, 'world');
    expect(toolbox.func()).toEqual('hello world');
  });

  it('can register a partial function', function() {
    var func = function(s) {
      return 'hello ' + s;
    };
    toolbox.register('func', func);
    expect(toolbox.func('world')).toEqual('hello world');
  });

  it('can register a partial function with multiple parameters', function() {
    var func = function(s, n) {
      return 'hello ' + new Array(n+1).join(s);
    };
    toolbox.register('func', func, 'world');
    expect(toolbox.func(3)).toEqual('hello worldworldworld');
  });

  it('can unregister a registered function', function() {
    var func = function() {};
    toolbox.register('func', func);
    expect(toolbox.func).not.toBe(undefined);
    toolbox.unregister('func');
    expect(toolbox.func).toBe(undefined);
  });
});
