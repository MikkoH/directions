var dijkstra = require( 'dijkstra-edsger' );

module.exports = directions;

function directions() {

  if( !( this instanceof directions ) ) {

    return new directions();
  }

  this.stateCount = 1;
  this.states = {};
  this.idToState = {};
  this.road = [];
  this.durations = {};
}

directions.prototype = {

  fromTo: function( from, to, duration ) {

    if( duration !== undefined ) {

      var durations = this.durations[ from ] || ( this.durations[ from ] = {} );
      durations[ to ] = duration;

      this.road.push( [ this.getId( from ),
                        this.getId( to ), 
                        duration ] );
    } else {

      duration = this.durations[ from ] && this.durations[ from ][ to ];
    }

    return duration;
  },

  getPath: function() {

    var totalCost = 0, 
        totalPath = [], 
        from, to, calcs, cost, path;

    for( var i = 1, len = arguments.length; i < len; i++ ) {

      from = arguments[ i - 1 ];
      to = arguments[ i ];

      calcs = new dijkstra( this.getId( from ), this.getId( to ), this.road );
      cost = calcs.getCost();
      path = calcs.getShortestPath();

      // if we have multiple destinations and it's not the first remove the first
      i > 1 && path.shift();

      path = path.map( function( id) {

        return this.idToState[ id ];
      }.bind( this ));

      totalCost += cost;
      totalPath = totalPath.concat( path );
    }

    return {

      cost: totalCost,
      path: totalPath
    };
  },

  getId: function( state ) {

    return this.states[ state ] || ( addState.call( this, state ) );
  }
};

function addState( state ) {

  var id = this.stateCount++;

  this.states[ state ] = id;
  this.idToState[ id ] = state;

  return id;
}