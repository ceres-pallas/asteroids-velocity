var BaseObject = require('asteroids-object');
var different = require('asteroids-different')(0.0001);

var Velocity = module.exports = function(){
    BaseObject.call(this);
    this._speed = 0;
    this._heading = 0;
    this._omega = 0;
};
Velocity.prototype = new BaseObject();
Velocity.prototype.velocity = function(value){
    if (value) {
        var oldSpeed = this._speed;
        var oldHeading = this._heading;
        var oldOmega = this._omega;
        this._speed = value.speed || oldSpeed;
        this._heading = value.heading || oldHeading;
        this._omega = value.omega || oldHeading
        if (different(oldSpeed, this._speed) || different(oldHeading, this._heading) || different(oldOmega, this._omega)) {
            this.notifyOf('velocity');
        }
    }
    return { 'speed': this._speed, 'heading': this._heading, 'omega': this._omega };
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
Velocity.prototype.omega = function(value){
    if (value) {
        this.velocity({ 'omega': value });
    }
    return this._omega;
};
Velocity.prototype.tick = function(){
    var position = this.position();
    var dx = this._speed * Math.cos(this._heading);
    var dy = this._speed * Math.sin(this._heading);
    this.position({ x: position.x + dx, y: position.y + dy });
    this.heading(this._heading + this._omega);
}
Velocity.prototype.state = function(){
    var position = this.position();
    var velocity = this.velocity();
    return {
        'x': position.x,
        'y': position.y,
        'radius': this.radius(),
        'orientation': this.orientation(),
        'speed': velocity.speed,
        'heading': velocity.heading,
        'omega': velocity.omega
    };
}
