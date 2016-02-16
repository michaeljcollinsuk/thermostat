'use strict';

function Plane(){
  // var this._location;
}

Plane.prototype.land = function(airport){
  airport.clearForLanding(this);
  this._location = airport;
};

Plane.prototype.takeoff = function(){
  this._location.clearForTakeoff('');
};
