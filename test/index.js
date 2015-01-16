var tape = require( 'tape' );
var directions = require( './..' );

var someDirections = directions();

someDirections.fromTo( 'alpha', 'idle', 1.2 );
someDirections.fromTo( 'idle', 'rolled', 1 );
someDirections.fromTo( 'rolled', 'idle', 1 );
someDirections.fromTo( 'idle', 'omega', 1.5 );

tape( 'get path', function( t ) {

  t.plan( 5 );

  var data1 = someDirections.getPath( 'alpha', 'omega' );
  var data2 = someDirections.getPath( 'alpha', 'rolled', 'omega' );

  t.equal( JSON.stringify( data1.path ), JSON.stringify( [ 'alpha', 'idle', 'omega' ] ), 'path was correct' );
  t.equal( JSON.stringify( data2.path ), JSON.stringify( [ 'alpha', 'idle', 'rolled', 'idle', 'omega' ] ), 'multi path was correct' );
  t.equal( data1.cost, 2.7, 'path cost was correct' );
  t.equal( data2.cost, 4.7, 'multi path cost was correct' );
  t.equal( someDirections.fromTo( 'alpha', 'idle' ), 1.2, 'individual duration was correct' );
});