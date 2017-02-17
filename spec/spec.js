/* *global describe, it */
var expect = require('chai').expect;
var sinon = require('sinon');

var _ = require('/home/bertie/w02-advanced-lowbar/main.js');

describe('_', function () {
    'use strict';
    it('is an object', function () {
        expect(_).to.be.an('object');
    });
    describe('#indexOf', function () {
        it('is a function', function () {
            expect(_.indexOf).to.be.a('function');
        });
        it('should return the index of the given value', function () {
            expect(_.indexOf([1,2,3], 2)).to.equal(1);
        });      
        it('should return -1 if value is not present', function () {
            expect(_.indexOf([1, 2, 3], 4)).to.equal(-1);
        });
        it('should work for a string', function () {
            expect(_.indexOf('string', 't')).to.equal(1);
        });
        it('should work with a third argument', function () {
            var sortedArray = ['1','2','3','4','5'];
            expect(_.indexOf(sortedArray, '1', true)).to.equal(0);
            expect(_.indexOf(sortedArray, '2', true)).to.equal(1);
            expect(_.indexOf(sortedArray, '3', true)).to.equal(2);
            expect(_.indexOf(sortedArray, '4', true)).to.equal(3);
        });
        it('should work with strings', function () {
            expect(_.indexOf('happy', 'y')).to.equal(4);
        });
        it('should work for false', function () {
            var jumbledArray = ['4','5','3','2','1'];
            expect(_.indexOf(jumbledArray, '1', false)).to.equal(4);
        });                
    });
    describe('#once', function () {
        it('is a function', function () {
            expect(_.once).to.be.a('function');
        });
        it('the returned function can only be called once', function () {
            var onceSpy = sinon.spy(function () {});
            var test = _.once(onceSpy);
            expect(onceSpy.callCount).to.equal(0);
            test();
            expect(onceSpy.callCount).to.equal(1);
            test();
            expect(onceSpy.callCount).to.equal(1);
        });
    });
    describe('#memoize', function () {
        it('is a function', function () {
            expect(_.memoize).to.be.a('function');
        });
        it('should only run the function if the results arent in the cache', function () {
            var spy = sinon.spy(function (n) {
                return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
            });
            var fibonacci = _.memoize(spy);
            expect(fibonacci(10)).to.equal(55);
            expect(spy.callCount).to.equal(11);
            expect(fibonacci(11)).to.equal(89);
            expect(spy.callCount).to.equal(12);
            fibonacci(10);
            expect(spy.callCount).to.equal(12);            
        });
    });
    describe('#delay', function () {
        it('is a function', function () {
            expect(_.delay).to.be.a('function');
        });
        it('still performs the function', function () {
            var result = 0;
            var spy = sinon.spy(function (n) {
                result = n * 2;
            });
            var clock = sinon.useFakeTimers();
            _.delay(spy, 0, 1);
            clock.tick(1000);
            expect(result).to.equal(2);
        });
        it('works for numerous arguments', function () {
            var spy = sinon.spy(function () {});
            var clock = sinon.useFakeTimers();
            _.delay(spy, 1000, 5, 3, 4);
            expect(spy.args[0]).to.eql(undefined);
            clock.tick(1000);
            expect(spy.args[0]).to.eql([5,3,4]);
        });
    });
    describe('#shuffle', function () {
        it('is a function', function () {
            expect(_.shuffle).to.be.a('function');
        });
    });
});