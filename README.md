# directions

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Add in locations by name and lengths/durations to those locations after which you can ask for directions.

## Usage

[![NPM](https://nodei.co/npm/directions.png)](https://www.npmjs.com/package/directions)

### Example

```javascript
var directions = require( 'directions' );

var someDirections = directions();

someDirections.fromTo( 'alpha', 'idle', 1.2 );
someDirections.fromTo( 'idle', 'rolled', 1 );
someDirections.fromTo( 'rolled', 'idle', 3 );
someDirections.fromTo( 'idle', 'omega', 1.5 );

var data = someDirections.getPath( 'alpha', 'omega' );

console.log( data.cost ); // 2.7
console.log( data.path ); // [ 'alpha', 'idle', 'omega' ]
console.log( someDirections.fromTo( 'alpha', 'idle' ) ); // 1.2
```

## License

MIT, see [LICENSE.md](http://github.com/mikkoh/directions/blob/master/LICENSE.md) for details.
