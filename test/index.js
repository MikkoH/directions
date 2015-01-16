var tape = require( 'tape' );
var directions = require( './..' );

var someDirections = directions();

someDirections.fromTo( 'alpha', 'idle', 1.2 );
someDirections.fromTo( 'idle', 'rolled', 1 );
someDirections.fromTo( 'rolled', 'idle', 1 );
someDirections.fromTo( 'idle', 'omega', 1.5 );

tape( 'get path', function( t ) {

  t.plan( 3 );

  var data = someDirections.getPath( 'alpha', 'omega' );

  t.equal( JSON.stringify( [ 'alpha', 'idle', 'omega' ] ), JSON.stringify( data.path ), 'path was correct' );
  t.equal( 2.7, data.cost, 'path cost was correct' );
  t.equal( 1.2, someDirections.fromTo( 'alpha', 'idle' ), 'individual duration was correct' );
});