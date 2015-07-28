var createPaths = require('create-paths');

module.exports = directions;

function directions() {

  if( !( this instanceof directions ) ) {

    return new directions();
  }

  this.stateCount = 1;
  this.states = {};
  this.idToState = {};
  this.road = [];
  this.traverse = null;
  this.durations = {};
}

directions.prototype = {

  fromTo: function( from, to, duration ) {

    if( duration !== undefined ) {

      var durations = this.durations[ from ] || ( this.durations[ from ] = {} );
      durations[ to ] = duration;

      this.road.push( [ from,
                        to, 
                        duration ] );

      this.traverse = createPaths(this.road);
    } else {

      duration = this.durations[ from ] && this.durations[ from ][ to ];
    }

    return duration;
  },

  getPath: function() {

    var totalCost = 0;
    var totalPath = []; 
    var from; 
    var to;
    var info;
    var cost;
    var path;

    for( var i = 1, len = arguments.length; i < len; i++ ) {

      from = arguments[ i - 1 ];
      to = arguments[ i ];

      info = this.traverse(from, to);
      cost = info.duration;
      path = info.path;

      // if we have multiple destinations and it's not the first remove the first
      if(i > 1) {
        path.shift();
      }

      totalCost += cost;
      totalPath = totalPath.concat( path );
    }

    return {

      cost: totalCost,
      path: totalPath
    };
  }
};