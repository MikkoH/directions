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
};

directions.prototype = {

  fromTo: function( from, to, duration ) {

    var durations = this.durations[ from ] || ( this.durations[ from ] = {} );
    durations[ to ] = duration;

    this.road.push( [ this.getId( from ),
                      this.getId( to ), 
                      duration ] );
  },

  getPath: function( from, to ) {

    if( this.states[ from ] === undefined ) {

      throw new Error( 'State ' + from + ' does not exist' );
    }

    if( this.states[ to ] === undefined ) {

      throw new Error( 'State ' + from + ' does not exist' );
    }

    var calcs = new dijkstra( this.getId( from ), this.getId( to ), this.road ),
        cost = calcs.getCost(),
        path = calcs.getShortestPath();

    path = path.map( function( id) {

      return this.idToState[ id ];
    }.bind( this ));

    return {

      cost: cost,
      path: path
    };
  },

  getDuration: function( from, to ) {

    return this.durations[ from ] && this.durations[ from ][ to ];
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