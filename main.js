var _ = {};

_.indexOf = function (array, value, bool) {
    if (arguments.length < 3 || !bool) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] === value) return i;
        }
        return -1;
    }
    function binarySearch (list, name) {
        var s = 0;
        var e = list.length - 1;
        for (var i = 0; i < 10; i++) {
            var m = Math.floor((e + s) / 2);
            if (list[m] === name) {
                return m;
            }
            if (name < list[m]) {
                e = m - 1;
            }
            if (name > list[m]) {
                s = m + 1;
            }
        }
        return -1;
    }
    if (bool) {
        return binarySearch(array, value);
    }
};

_.once = function (func) {
    var called = true;
    var result;
    return function () {
        if (called) {
            called = false;
            result = func.apply(null, arguments);
            return result;
        }
        if (!called) {
            return result;
        }
    };
};

_.memoize = function (func) {
    var cache = {};
    return function () {
        if (cache[arguments[0]]) {
            return cache[arguments[0]];
        }
        var result = func.apply(null, arguments);
        cache[arguments[0]] = result;
        return result;
    };
};

_.delay = function (func, wait) {
    var args = [];
    for (var i = 2; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    function doSomething () {
        return func.apply(null, args);
    }
    setTimeout(doSomething, wait);
};

_.shuffle = function () {
//      Returns a shuffled copy of the list, using a version of the Fisher-Yates shuffle.

// _.shuffle([1, 2, 3, 4, 5, 6]);
// => [4, 1, 6, 3, 5, 2]


};

_.invoke = function () {
    /*
    *Calls the method named by methodName on each value in the list. Any extra arguments passed to invoke will be forwarded on to the method invocation.

_.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
=> [[1, 5, 7], [1, 2, 3]]
 */

};

if (typeof module !== 'undefined') {
    module.exports = _;
}
