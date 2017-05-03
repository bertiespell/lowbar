/* *global describe, it */
var expect = require('chai').expect;
var sinon = require('sinon');
const _ = require('../main.js');

describe('_', function () {
    'use strict';
    it('is an object', function () {
        expect(_).to.be.an('object');
    });
    describe('#identity', function () {
        it('is a function', function () {
            expect(_.identity).to.be.a('function');
        });
        it('returns the argument passed to it', function () {
            expect(_.identity(1)).to.equal(1);
            var tstArr = [1, 2, 3];
            expect(_.identity(tstArr)).to.equal(tstArr);
        });
        it('returns undefined if no arguments are passed', function () {
            expect(_.identity()).to.be.an('undefined');
        });
    });
    describe('#first', function () {
        it('is a function', function () {
            expect(_.first).to.be.a('function');
        });
        // it('should return undefined if there are no arguments, or if the argument is not a valid array', function () {
        //     expect(_.first()).to.eql(undefined);
        //     expect(_.first('test')).to.eql(undefined);
        // });
        // it('should return first element in array', function () {
        //     expect(_.first([1, 2, 3])).to.equal(1);
        //     expect(_.first([1, 2, 3], 1)).to.equal(1);
        // });
        it('should return the first \'n\' elements', function () {
            expect(_.first([1, 2, 3, 4, 5], 3)).to.eql([1, 2, 3]);
        });
        it('should return the whole array if n is greater than or equal to the array.length', function () {
            expect(_.first([1, 2, 3], 4)).to.eql([1, 2, 3]);
        });
    });
    describe('#last', function () {
        it('is a function', function () {
            expect(_.last).to.be.a('function');
        });
        it('should return last element in array', function () {
            expect(_.last([1, 2, 3])).to.equal(3);
        });
        it('should return the last \'n\' elements', function () {
            expect(_.last([1, 2, 3, 4, 5], 3)).to.eql([3, 4, 5]);
        });
        it('should return the whole array if n is greater than or equal to the array.length', function () {
            expect(_.last([1, 2, 3], 4)).to.eql([1, 2, 3]);
        });
    });
    describe('#indexOf', function () {
        it('is a function', function () {
            expect(_.indexOf).to.be.a('function');
        });
        it('should return the index of the given value', function () {
            expect(_.indexOf([1, 2, 3], 2)).to.equal(1);
        });
        it('should return -1 if value is not present', function () {
            expect(_.indexOf([1, 2, 3], 4)).to.equal(-1);
        });
        it('should work for a string', function () {
            expect(_.indexOf('string', 't')).to.equal(1);
        });
        it('should work with a third argument', function () {
            var sortedArray = ['1', '2', '3', '4', '5'];
            expect(_.indexOf(sortedArray, '1', true)).to.equal(0);
            expect(_.indexOf(sortedArray, '2', true)).to.equal(1);
            expect(_.indexOf(sortedArray, '3', true)).to.equal(2);
            expect(_.indexOf(sortedArray, '4', true)).to.equal(3);
        });
        it('should work with strings', function () {
            expect(_.indexOf('happy', 'y')).to.equal(4);
        });
        it('should work for false', function () {
            var jumbledArray = ['4', '5', '3', '2', '1'];
            expect(_.indexOf(jumbledArray, '1', false)).to.equal(4);
        });
    });
    describe('#once', function () {
        it('is a function', function () {
            expect(_.once).to.be.a('function');
        });
        it('the returned function can only be called once', function () {
            var onceSpy = sinon.spy(function () { });
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
            var spy = sinon.spy(function () { });
            var clock = sinon.useFakeTimers();
            _.delay(spy, 1000, 5, 3, 4);
            expect(spy.args[0]).to.eql(undefined);
            clock.tick(1000);
            expect(spy.args[0]).to.eql([5, 3, 4]);
        });
    });
    describe('#shuffle', function () {
        it('is a function', function () {
            expect(_.shuffle).to.be.a('function');
        });
    });
    describe('#invoke', function () {
        it('is a function', function () {
            expect(_.invoke).to.be.a('function');
        });
        it('should call the method on each thing in the list', function () {
            var actual = _.invoke([[5, 1, 7], [3, 2, 1]], 'first', 2);
            var expected = [[5, 1], [3, 2]];
            expect(actual).to.eql(expected);
        })
    });
    describe('#intersection', () => {
        it('is a function', () => {
            expect(_.intersection).to.be.a('function');
        });
        it('if value is present in all arrays, add to results array', () => {
            const actual = _.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1]);
            expect(actual).to.eql([1, 2]);
        });
    });
    describe('#difference', () => {
        it('is a function', () => {
            expect(_.intersection).to.be.a('function');
        });
        it('if value is present in all arrays, add to results array', () => {
            const actual = _.difference([1, 2, 3, 4, 5], [5, 2, 10]);
            expect(actual).to.eql([1, 3, 4]);
        });
    });
    xdescribe('#throttle', function () {
        it('is a function', function () {
            expect(_.throttle).to.be.a('function');
        });
        it('should call the function once per wait', function () {
            var spy = sinon.spy(function () { });
            var clock = sinon.useFakeTimers();
            _.throttle(spy, 1000);
            expect(spy.callCount).to.equal(1);
            _.throttle(spy, 1000);
            expect(spy.callCount).to.equal(1);
            _.throttle(spy, 1000);
            expect(spy.callCount).to.equal(1);
            _.throttle(spy, 1000);
            expect(spy.callCount).to.equal(1);
            clock.tick(1000);
            expect(spy.callCount).to.equal(2);
            expect(spy.callCount).to.equal(2);
            clock.tick(1000);
            expect(spy.callCount).to.equal(3);
        });
    });
    describe('#sortBy', () => {
        it('is a function', () => {
            expect(_.sortBy).to.be.a('function');
        });
        it('should sort objects by key', function () {
            var stooges = [{ name: 'moe', age: 40 }, { name: 'larry', age: 50 }, { name: 'curly', age: 60 }];
            var actual = _.sortBy(stooges, 'name');
            var expected = [{ name: 'curly', age: 60 }, { name: 'larry', age: 50 }, { name: 'moe', age: 40 }];
            expect(actual).to.eql(expected);
        });
        it('should work for arrays', () => {
            var actual = _.sortBy([1, 3, 2, 4, 5, 6], function (num) { return Math.sin(num); });
            var expected = [5, 4, 6, 3, 1, 2];
            expect(actual).to.eql(expected);
        });
    });
    describe('#zip', () => {
        it('should be a function', () => {
            expect(_.zip).to.be.a('function');
        });
        it('should merge arrays together based on index position', () => {
            const actual = _.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]);
            const expected = [['moe', 30, true], ['larry', 40, false], ['curly', 50, false]];
            expect(actual).to.eql(expected);
        });
    });
    describe('#sortedIndex', () => {
        it('should be a function', () => {
            expect(_.sortedIndex).to.be.a('function');
        });
        it('should return the insetion index', () => {
            var actual = _.sortedIndex([10, 20, 30, 40, 50], 55);
            var expected = 5;
            expect(actual).to.eql(expected);

        });
        it('should return the insetion index', () => {
            var stooges = [{ name: 'moe', age: 40 }, { name: 'curly', age: 60 }];
            var actual = _.sortedIndex(stooges, { name: 'larry', age: 50 }, 'age');
            var expected = 1;
            expect(actual).to.eql(expected);
        });
        it('should work when passed iteratee', () => {
            var test = function (num) { return Math.sin(num); };
            var expected = 0;
            var actual = _.sortedIndex([1, 3, 2, 4, 5, 6], 5, test);
            expect(actual).to.eql(expected);
        });
    });
    describe('#flatten', () => {
        it('should be a function', () => {
            expect(_.flatten).to.be.a('function');
        });
        it('should flatten array', () => {
            const actual = _.flatten([1, [2], [3, [[4]]]]);
            const expected = [1, 2, 3, 4];
            expect(actual).to.eql(expected);
        });
        it('should only flatten one level if passed boolean', () => {
            const actual = _.flatten([1, [2], [3, [[4]]]], true);
            const expected = [1, 2, 3, [[4]]];
            expect(actual).to.eql(expected);
        });
    });
});