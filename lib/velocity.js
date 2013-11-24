var BaseObject = require('asteroids-object');
var different = require('asteroids-different')(0.0001);

var Velocity = module.exports = function(){
    BaseObject.call(this);
    this._speed = 0;
    this._heading = 0;
};
Velocity.prototype = new BaseObject();
Velocity.prototype.velocity = function(value){
    if (value) {
	var oldSpeed = this._speed;
	var oldHeading = this._heading;
	this._speed = value.speed || oldSpeed;
	this._heading = value.heading || oldHeading;
	if (different(oldSpeed, this._speed) || different(oldHeading, this._heading)) {
	    this.notifyOf('velocity');
	}
    }
    return { 'speed': this._speed, 'heading': this._heading };
};
Velocity.prototype.speed = function(value){
    if (value) {
	this.velocity({ 'speed': value })
    }
    return this._speed;
};
Velocity.prototype.heading = function(value){
    if (value) {
	this.velocity({ 'heading': value });
    }
    return this._heading;
};
