var expect = require('chai').expect;

var Velocity = require('../lib/velocity');

describe('Velocity', function(){
    it('should exist', function(){
        expect(Velocity).to.exist;
    });

    it('should be a constructor', function(){
        expect(Velocity).to.be.a('function');
    });

    it('should be an instance of BaseObject', function(){
        expect(new Velocity()).to.be.an.instanceof(require('asteroids-object'));
    });

    describe('object', function(){
        var velocity;

        beforeEach(function(){
            velocity = new Velocity();
        });

        ['speed', 'heading', 'velocity', 'omega', 'tick', 'state'].forEach(function(methodName){
            it('should respond to ' + methodName, function(){
                expect(velocity).to.respondTo(methodName);
            });
        });
    });

    describe('interactions', function(){
        var velocity;

        beforeEach(function(){
            velocity = new Velocity;
        });

        it('should have a default speed', function(){
            expect(velocity.speed()).to.equal(0);
        });

        it('should be able to set the speed', function(){
            var value = 1;

            velocity.speed(value);

            expect(velocity.speed()).to.equal(value);
        });

        it('should have a default heading', function(){
            expect(velocity.heading()).to.equal(0);
        });

        it('should be able to set the heading', function(){
            var value = Math.PI/3;

            velocity.heading(value);

            expect(velocity.heading()).to.equal(value);
        });

        it('should have a default velocity', function(){
            expect(velocity.velocity()).to.deep.equal({ speed: 0, heading: 0, omega: 0 });
        });

        it('should be able to set the velocity', function(){
            var value = {
                'speed': 1,
                'heading': Math.PI/3,
                'omega': 0
            };

            velocity.velocity(value);

            expect(velocity.velocity()).to.deep.equal(value);
        });

        it('should have a default omega', function(){
            expect(velocity.omega()).to.equal(0);
        });

        it('should be able to set the omega', function(){
            var value = Math.PI/6;

            velocity.omega(value);

            expect(velocity.omega()).to.equal(value);
        });

        [
            function(velocity){ velocity.speed(1.0); },
            function(velocity){ velocity.heading(Math.PI); },
            function(velocity){ velocity.omega(Math.PI/2); },
            function(velocity){ velocity.velocity({ 'speed': 1.0 }); },
            function(velocity){ velocity.velocity({ 'heading': Math.PI }); },
            function(velocity){ velocity.velocity({ 'omega': Math.PI/2 }); },
            function(velocity){ velocity.velocity({ 'speed': 1.0, 'heading': Math.PI }); },
            function(velocity){ velocity.velocity({ 'speed': 1.0, 'omega': Math.PI/2 }); },
            function(velocity){ velocity.velocity({ 'heading': Math.PI, 'omega': Math.PI/2 }); },
            function(velocity){ velocity.velocity({ 'speed': 1.0, 'heading': Math.PI, 'omega': Math.PI/2 }); },
        ].forEach(function(mutator){
            it('should notify upon changes', function(done){
                velocity.addListener('velocity', function(){ done() });

                mutator(velocity);
            });
        });
    });

    describe('tick', function(){
        var velocity;

        beforeEach(function(){
            velocity = new Velocity();
            velocity.position({ x: 0, y: 0 });
            velocity.velocity({ speed: 1, heading: 0 });
        });

        [
            { heading: 0,          omega: 0,         x:  1.0, y:  0.0, h: 0.0 },
            { heading: Math.PI,    omega: 0,         x: -1.0, y:  0.0, h: Math.PI },
            { heading: Math.PI/2,  omega: 0,         x:  0.0, y:  1.0, h: Math.PI/2 },
            { heading: -Math.PI/2, omega: 0,         x:  0.0, y: -1.0, h: -Math.PI/2 },
            { heading: 0,          omega: Math.PI/2, x:  1.0, y:  0.0, h: 1*Math.PI/2 },
            { heading: Math.PI,    omega: Math.PI/2, x: -1.0, y:  0.0, h: 3*Math.PI/2 },
            { heading: Math.PI/2,  omega: Math.PI/2, x:  0.0, y:  1.0, h: 2*Math.PI/2 }
        ].forEach(function(testCase){
            it('should update position when heading is ' + testCase.heading, function(){
                velocity.velocity(testCase);

                velocity.tick();

                expect(velocity.x()      ).to.be.closeTo(testCase.x, 0.0001);
                expect(velocity.y()      ).to.be.closeTo(testCase.y, 0.0001);
                expect(velocity.heading()).to.be.closeTo(testCase.h, 0.0001);
            });

        });
    });

    describe('state', function(){
        var velocity;

        beforeEach(function(){
            velocity = new Velocity();
            velocity.position({ x: 0, y: 0 });
            velocity.velocity({ speed: 1, heading: 0 });
        });

        ['x', 'y', 'radius', 'orientation', 'speed', 'heading', 'omega'].forEach(function(key){
            it('should contain the key ' + key, function(){
                var state = velocity.state();

                expect(state).to.contain.keys(key);
            });
        });
    });

});
