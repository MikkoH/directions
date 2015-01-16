var directions = require( './..' );

var someDirections = directions();

someDirections.fromTo( 'alpha', 'idle', 1 );
someDirections.fromTo( 'idle', 'rolled', 1 );
someDirections.fromTo( 'rolled', 'idle', 1 );
someDirections.fromTo( 'idle', 'omega', 1 );

console.log( someDirections.getPath( 'alpha', 'omega' ) );