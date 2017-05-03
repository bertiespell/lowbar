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
    describe('#each', function () {
        it('is a function', function () {
            expect(_.each).to.be.a('function');
        });
        it('should return the complete list', function () {
            expect(_.each([1, 2, 3, 4], function () { })).to.eql([1, 2, 3, 4]);
        });
        it('should check that iteratee has been run', function () {
            var counter = 0;
            function addOne () { counter++; }
            _.each([1, 2, 3], addOne);
            expect(counter).to.equal(3);
        });
        it('should also work on an object', function () {
            var counter = 0;
            function addOne () { counter++; }
            _.each({one: 1, two: 2, three: 3}, addOne);
            expect(counter).to.equal(3);
        });
        it('binds the iteratee to the specified context', function () {
            let spy = sinon.spy();
            _.each([1, 2, 3], spy, [2, 3, 4]);
            expect(spy.thisValues[0]).to.eql([2, 3, 4]);
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
    describe('#filter', function () {
        it('should be a function', function () {
            expect(_.filter).to.be.a('function');
        });
        it('if there\'s no predicate it should return list', function () {
            expect(_.filter([1, 2])).to.eql([1, 2]);
        });
        it('should filter correctly', function () {
            expect(_.filter([1, 2, 3, 4, 5, 6], function (num) { return num % 2 === 0; })).to.eql([2, 4, 6]);
        });
    });
    describe('#reject', function () {
        it('should be a function', function () {
            expect(_.reject).to.be.a('function');
        });
        it('if there\'s no predicate it should return list', function () {
            expect(_.reject([1, 2])).to.eql([1, 2]);
        });
        it('should reject correctly', function () {
            expect(_.reject([1, 2, 3, 4, 5, 6], function (num) { return num % 2 === 0; })).to.eql([1, 3, 5]);
        });
    });
    describe('#uniq', function () {
        it('should be a function', function () {
            expect(_.uniq).to.be.a('function');
        });
        it('should return an empty array if no arguments are passed', function () {
            expect(_.uniq()).to.eql([]);
        });
        it('should return uniq elements in array', function () {
            expect(_.uniq([1, 2, 1, 4, 1, 3])).to.eql([1, 2, 4, 3]);
            expect(_.uniq([2, 2, 2])).to.eql([2]);
            expect(_.uniq([])).to.eql([]);
        });
        it('should work for other value types', function () {
            expect(_.uniq('hello')).to.eql(['h', 'e', 'l', 'o']);
            expect(_.uniq(665)).to.eql([]);
            expect(_.uniq({})).to.eql([]);
            expect(_.uniq(true)).to.eql([]);
        });
    });
    describe('#map', function () {
        it('should be a function', function () {
            expect(_.map).to.be.a('function');
        });
        it('should return a new array where a function has been applied to each element', function () {
            function doubleNum (num) { return num * 2; }
            expect(_.map([1, 2, 3, 4], doubleNum)).to.eql([2, 4, 6, 8]);
        });
        it('should run the function for every element in array', function () {
            function doubleNum (num) { return num * 2; }
            var expected = 4; // the number of times doubleNum has run
            var spy = sinon.spy(doubleNum); // 4
            _.map([1, 2, 3, 4], spy);
            expect(spy.callCount).to.equal(expected);
        });
        it('should work for an object', function () {
            var func = function (element) { return element + 10; };
            expect(_.map({A: 1, B: 2}, func)).to.eql([11, 12]);
        });
    });
    describe('#pluck', function () {
        it('should return an array containing propetyName values', function () {
            var actual = _.pluck([{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}], 'name');
            var expected = ['moe', 'larry', 'curly'];
            expect(actual).to.eql(expected);
        });
        it('should return an array of undefines if no propertyName argument is passed', function () {
            var actual = _.pluck([{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}]);
            var expected = [undefined, undefined, undefined];
            expect(actual).to.eql(expected);
        });
    });
    describe('#reduce', function () {
        it('should add up all numbers in an array if told to', function () {
            function addUp (acc, num) { return acc + num; }
            expect(_.reduce([1, 2, 3, 4], addUp, 0)).to.equal(10);
        });
        it('should add up all numbers in an array starting from a memo value', function () {
            function addUp (acc, num) { return acc + num; }
            expect(_.reduce([1, 2, 3, 4], addUp, 1)).to.equal(11);
        });
        it('should assume the memo to be the first element if no memo given', function () {
            function addUp (acc, num) { return acc + num; }
            expect(_.reduce([2, 2, 3, 10], addUp)).to.equal(17);
        });
        it('reduces an array of alues into an object with frequencies', function () {
            var actual = _.reduce([1, 2, 3, 1], function (acc, num) {
                if (acc[num]) {
                    acc[num]++;
                } else {
                    acc[num] = 1;
                }
                return acc;
            }, {});
            var expected = {1: 2, 2: 1, 3: 1};
            expect(actual).to.eql(expected);
        });
        it('should work for objects', () => {
            function add (memo, num) { return memo += num; }
            var expected = 545;
            var actual = _.reduce({a: 34, b: 23, c: 342, d: 123, e: 23}, add);
            expect(actual).to.equal(expected);
        });
    });
    describe('#contains', function () {
        it('should be a function', function () {
            expect(_.contains).to.be.a('function');
        });
        it('should produce true if it contains value', function () {
            expect(_.contains([1, 2, 3], 3)).to.equal(true);
            expect(_.contains([1, 2, 3], 4)).to.equal(false);
        });
    });
    describe('#every', function () {
        it('should be a function', function () {
            expect(_.every).to.be.a('function');
        });
        it('should return true is all the values in the list pass the predicate truth test, false if an element fails the predicate', function () {
            expect(_.every([2, 4, 5], function (num) { return num % 2 == 0; })).to.eql(false);
            expect(_.every([2, 4, 6], function (num) { return num % 2 == 0; })).to.eql(true);
        });
    });
    describe('#some', function () {
        it('should be a function', function () {
            expect(_.some).to.be.a('function');
        });
        it('should return true if any of the values in the list pass the predicate truth test', function () {
            expect(_.some([null, 0, 'yes', false])).to.eql(true);
            var isEven = function (element) { return (element % 2 === 0); };
            var withEvens = [1, 2, 3, 4];
            var noEvens = [1, 3, 5, 7];
            expect(_.some(withEvens, isEven)).to.eql(true);
            expect(_.some(noEvens, isEven)).to.eql(false);
        });
    });
    describe('#extend', function () {
        it('should be a function', function () {
            expect(_.extend).to.be.a('function');
        });
        it('should copy shallowly all properties in source object to the destination object', function () {
            expect(_.extend({name: 'moe'}, {age: 50})).to.eql({name: 'moe', age: 50});
        });
        it('copies the properties of the source object into the target', function () {
            var actual = _.extend({}, {name: 'Sam'});
            var expected = {name: 'Sam'};
            expect(actual).to.eql(expected);
        });
        it('overwrites existing properties', function () {
            var actual = _.extend({}, {name: 'joe', name: 'Sam'});
            var expected = {name: 'Sam'};
            expect(actual).to.eql(expected);
        });
        it('copies properties from multiple source arguments', function () {
            var actual = _.extend({name: 'sam'}, {name: 'Joe'}, {name: 'Mauro', age: 27});
            var expected = {name: 'Mauro', age: 27};
            expect(actual).to.eql(expected);
        });
        xit('works for arrays', function () {
            var actual = _.extend([1, 2, 3], [4, 5, 6], {name: 'Mauro'});
            var expected = [4, 5, 6];
            expected.name = 'Mauro';
            expect(actual).to.eql(expected);
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
        });
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
            var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
            var actual = _.sortBy(stooges, 'name');
            var expected = [{name: 'curly', age: 60}, {name: 'larry', age: 50}, {name: 'moe', age: 40}];
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
            var stooges = [{name: 'moe', age: 40}, {name: 'curly', age: 60}];
            var actual = _.sortedIndex(stooges, {name: 'larry', age: 50}, 'age');
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