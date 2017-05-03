var _ = {};

_.identity = function (val) {
    return val;
};

_.first = function (array, n) {
    if (!Array.isArray(array)) return;
    if ((n || arguments.length) === 1) return array[0];
    if (n >= array.length) return array;
    var result = [];
    for (var i = 0; i < n; i++) {
        result.push(array[i]);
    }
    return result;
};

_.last = function (array, n) {
    if ((n || arguments.length) === 1) {
        return array[array.length - 1];
    }
    return _.first(array.reverse(), n).reverse();
};

_.each = function (list, iteratee, context) {
    let func = iteratee.bind(context);
    if (Array.isArray(list)) {
        for (var index = 0; index < list.length; index++) {
            func(list[index], index, list);
        }
        return list;
    }
    for (var key in list) {
        func(list[key], key, list);
    }
    return list;
};

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

_.filter = function (list, func, context) {
    if (!context) context = this;
    if (!func) return list;
    var result = [];
    for (var i = 0; i < list.length; i++) {
        if (func.apply(context, [list[i], i, list])) {
            result.push(list[i]);
        }
    }
    return result;
};

_.reject = function (list, func, context) {
    if (!context) context = this;
    if (!func) return list;
    var result = [];
    for (var i = 0; i < list.length; i++) {
        if (!func.apply(context, [list[i], i, list])) {
            result.push(list[i]);
        }
    }
    return result;
};

_.uniq = function (array, isSorted, iteratee) {
    // TODO: find algorithm for isSorted
    var result = [];
    if (!array) return result;
    for (var i = 0; i < array.length; i++) {
        if (iteratee && result.indexOf(iteratee(array[i]))) {
            result.push(array[i]);
        }
        else if (result.indexOf(array[i]) === -1) result.push(array[i]);
    }
    return result;
};

_.map = function (list, iteratee, context) {
    // TODO: check that it works for other contexts
    if (!context) context = this;
    var result = [];
    for (var key in list) {
        result.push(iteratee.apply(context, [list[key], key, list]));
    }
    return result;
};

_.pluck = function (list, propertyName) {
    const result = [];
    for (var key in list) {
        result.push(list[key][propertyName]);
    }
    return result;
};

_.reduce = function (list, iteratee, memo, context) {
    if (!context) context = this;
    if (Array.isArray(list)) {
        for (let i = 0; i < list.length; i++) {
            if (memo === undefined) {
                memo = list[0];
                i++;
                memo = iteratee.apply(context, [memo, list[i], i, list]);
            }
            else {
                memo = iteratee.apply(context, [memo, list[i], i, list]);
            }
        }
    }
    else {
        var keys = Object.keys(list);
        for (var i = 0; i < keys.length; i++) {
            if (memo === undefined) {
                memo = list[keys[i]];
                i++;
                memo = iteratee.apply(context, [memo, list[keys[i]], i, list]);
            }
            else {
                memo = iteratee.apply(context, [memo, list[keys[i]], i, list]);
            }
        }
    }
    return memo;
};

_.contains = function (list, value, fromIndex) {
    // TODO: does work for objects?
    if (!fromIndex) fromIndex = 0;
    for (var i = fromIndex; i < list.length; i++) {
        if (list[i] === value) return true;
    }
    return false;
};

_.every = function (list, predicate, context) {
    if (!context) context = this;
    let every = true;
    for (var key in list) {
        if (!predicate.call(context, list[key])) {
            every = false;
        }
    }
    return every;
};

_.some = function (list, predicate, context) {
    if (!context) context = this;
    for (var key in list) {
        if (!predicate) {
            if (list[key]) return true;
        }
        else if (predicate.call(context, list[key])) {
            return true;
        }
    }
    return false;
};

_.extend = function (destination) {
    // TODO: implement with second argument: source
    for (var i = 1; i < arguments.length; i++) {
        for (var key in arguments[i]) {
            destination[key] = arguments[i][key];
        }
    }
    return destination;
};

_.defaults = function (object, defaults) {
  for (var key in defaults) {
    if (!object[key]) {
      object[key] = defaults[key]
    }
  }
  return object;
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
        if (cache[arguments[0]]) return cache[arguments[0]];
        else {
            cache[arguments[0]] = func(arguments[0]);
            return cache[arguments[0]];
        }
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

_.zip = function () {
    const results = [];
    for (var i = 0; i < arguments[0].length; i++) {
        let tempArr = [];
        for (var j = 0; j < arguments.length; j++) {
            tempArr.push(arguments[j][i]);
        }
        results.push(tempArr);
    }
    return results;
};

_.sortedIndex = function (list, value, iteratee) {
    if (arguments.length === 3) {
        return binarySearch(_.sortBy(list, iteratee), value);
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
        return m + 1;
    }
    return binarySearch(list, value);
};

_.sortBy = function (list, iteratee) {
    if (typeof iteratee === 'string') {
        let orderedArray = [];
        list.forEach(function (element) {
            orderedArray.push(element[iteratee]);
        });
        orderedArray.sort();
        var result = [];
        orderedArray.forEach(function (element) {
            list.forEach(function (key) {
                if (key[iteratee] === element) {
                    result.push(key);
                }
            });
        });
        return result;
    }
    if (Array.isArray(list)) {
        return list.sort(function (a, b) {
            return iteratee(a) - iteratee(b);
        });
    }
};

_.every = function (list, predicate) {
    var array = [];
    _.each(list, function (element) {
        if (predicate(element)) array.push(element);
    });
    if (array.length === list.length) return true;
    return false;
};

_.flatten = function (list, bool) {
    const res = [];
    if (bool) {
        list.forEach(function (element) {
            if (!Array.isArray(element)) {
                res.push(element);
            } else {
                element.forEach(function (element) {
                    res.push(element);
                });
            }
        });
    }
    else {
        var flattenRecursion = function (arr) {
            if (!Array.isArray(arr)) {
                res.push(arr);
            }
            else {
                arr.forEach(function (element) {
                    return flattenRecursion(element);
                });
            }
        };
        flattenRecursion(list);
    }
    return res;
};

_.shuffle = function (list) {
    var result = [];
    var listLength = list.length;
    while (result.length !== listLength) {
        var randomNumber = createRandomNumber(0, list.length - 1);
        result.push(list[randomNumber]);
        list = list.slice(0, randomNumber).concat(list.slice(randomNumber + 1));
    }
    return result;
};

function createRandomNumber (max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
}

_.first = function (array, n) {
    if (arguments.length === 1) return array[0];
    return array.slice(0, n);
};

_.invoke = function (list, methodName, ...args) {
    var newList = list.slice();
    var func = _[methodName];
    for (var key in newList) {
        newList[key] = func.apply(this, [newList[key], ...args]);
    }
    return newList;
};

_.contains = function (list, value, fromIndex) {
    if (!fromIndex) fromIndex = 0;
    for (var i = fromIndex; i < list.length; i++) {
        if (list[i] === value) return true;
    }
    return false;
};

_.every = function (list, predicate, context) {
    if (!context) context = this;
    let every = true;
    for (var key in list) {
        if (!predicate.call(context, list[key])) {
            every = false;
        }
    }
    return every;
};

_.intersection = function () {
    var result = [];
    var args = [...arguments];
    for (var j = 0; j < args[0].length; j++) {
        var current = args[0][j];
        if (_.every(args, function (array) {
            return _.contains(array, current);
        }))
            result.push(current);
    }
    return result;
};

_.difference = function () {
    var result = [];
    var args = [...arguments];
    var alternate = args.slice(1, args.length);
    for (var j = 0; j < args[0].length; j++) {
        var current = args[0][j];
        if (_.every(alternate, function (array) {
            return !_.contains(array, current);
        }))
            result.push(current);
    }
    return result;
};

_.throttle = function (func, wait) {
    var args = [...arguments].slice(2, arguments.length);
    var result;
    var counter = 0;
    return function () {
        if (counter === 0) {
            result = func.apply(null, [args]);
            return result;
        }
        while (counter > 0) {
            counter--;
            result = _.delay(func, wait);
            return result;
        }
    };
};

if (typeof module !== 'undefined') {
    module.exports = _;
}
