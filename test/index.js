var tape = require( 'tape' );
var directions = require( './..' );

var someDirections = directions();

someDirections.fromTo('alpha', 'idle', 2);
someDirections.fromTo('idle', 'rolled', 1);
someDirections.fromTo('rolled', 'idle', 1);
someDirections.fromTo('idle', 'omega', 1.5);

tape('test getting back a duration', function(t) {

  t.equal(someDirections.fromTo( 'alpha', 'idle' ), 2, 'individual duration was correct');

  t.end();
});

tape('test single hops', function(t) {

  var info = someDirections.getPath( 'alpha', 'omega');
  
  t.deepEqual(info.path, [ 'alpha', 'idle', 'omega' ], 'path was correct');
  t.equal(info.cost, 3.5, 'path cost was correct');
  
  t.end();
});

tape('test multi hots', function(t) {

  var info = someDirections.getPath( 'alpha', 'rolled', 'omega');

  t.deepEqual(info.path, [ 'alpha', 'idle', 'rolled', 'idle', 'omega' ], 'multi path was correct');
  t.equal(info.cost, 5.5, 'multi path cost was correct');

  t.end();
});

tape('going from a path between', function(t) {

  var info;

  info = someDirections.getPath( { from: 'alpha', to: 'idle', location: 0.1 }, 'omega');

  t.equal(info.cost, 3.4, 'single path cost was correct');
  t.deepEqual(info.path, [ 'idle', 'omega' ], 'single path cost was correct');

  t.end();
});