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

_.delay = function () {

};

if (typeof module !== 'undefined') {
    module.exports = _;
}
