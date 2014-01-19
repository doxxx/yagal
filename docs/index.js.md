Yet Another Genetic Algorithm Library
=====================================

**YAGAL** is a Javascript library for developing genetic algorithms. It is
inspired by the DEAP library for Python.

## Toolbox

The `Toolbox` class is used to create a toolbox of utility functions.

    var toolbox = new Toolbox();

A function be registered, along with a list of argument values that the
function expects. That function can then be referenced from the toolbox,
with registered arguments values automatically provided.

    function add(x, y) {
      return x + y;
    }

    toolbox.register('add12', add, 1, 2);

    toolbox.add12();                             // => 3

Partial functions can be created by providing only some values for the
functions arguments.

    toolbox.register('add1', add, 1);
    toolbox.add1(2);                             // => 3

Or none at all.

    toolbox.register('add', add);
    toolbox.add(1, 2);                           // => 3

Functions can be also unregistered.

    toolbox.unregister('add');
    toolbox.add(1, 2);                           // => TypeError


## Fitness

The `defineFitnessClass` function is used to define a class that can be
instantiated to represent a set of weighted fitness values. The weights are
embedded in the class when it is defined and are used to modify the given
values in a particular instance.

    var MyFitness = defineFitnessClass([1.0, 0.5]);
    var f1 = new MyFitness([50, 60]);
    f1.values()                                  // => [50, 60]
    f1.weightedValues()                          // => [50, 30]

Instances of a fitness class can be compared using a variety of functions.
The `compare` function returns -1, 0, or 1 depending on whether the fitness'
values are respectively less than, equal to, or greater than another fitness's
values.

    var f2 = new MyFitness([60, 60]);
    f1.compare(f2)                               // => 1
    f2.compare(f1)                               // => -1

The `lt`, `lte`, `eq`, `gte`, and `gt` functions are shorthand for the
corresponding `compare` calls.

    f1.gt(f2) == f1.compare(f2) > 0
    f2.lt(f2) == f2.compare(f1) < 0
