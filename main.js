var _ = {};

_.indexOf = function (array, value, bool) {
    if (arguments.length < 3 || !bool) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] === value) return i;
        }
        return -1;
    }
    function binarySearch(list, name) {
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

/** memoize_.memoize(function, [hashFunction])
Memoizes a given function by caching the computed result. Useful for speeding up slow-running computations. If passed an optional hashFunction, it will be used to compute the hash key for storing the result, based on the arguments to the original function. The default hashFunction just uses the first argument to the memoized function as the key. The cache of memoized values is available as the cache property on the returned function.
 
var fibonacci = _.memoize(function(n) {
  return n < 2 ? n: fibonacci(n - 1) + fibonacci(n - 2);
});
 */

_.memoize = function (func) {
    var cache = {};
    return function () {
        if (cache[arguments[0]]) return cache[arguments[0]];
        else {
            cache[arguments[0]] = func(arguments[0]);
            return cache[arguments[0]];
        }
    }
}

_.delay = function (func, wait) {
    var args = [];
    for (var i = 2; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    function doSomething() {
        return func.apply(null, args);
    }
    setTimeout(doSomething, wait);
}

_.shuffle = function () {
}

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
    function binarySearch(list, name) {
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
}

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
    // I am sure there is a way to refactor this with reduce! 
};

_.flatten = function (list, bool) {
    const res = [];
    if (bool) {
        list.forEach(function (element) {
            if (!Array.isArray(element)) {
                res.push(element);
            } else {
                element.forEach(function (element) {
                    res.push(element)
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
    var listLength = list.length
    while (result.length !== listLength) {
        var randomNumber = createRandomNumber(0, list.length - 1);
        result.push(list[randomNumber]);
        list = list.slice(0, randomNumber).concat(list.slice(randomNumber + 1));
    }
    return result;
}

function createRandomNumber(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
}

_.first = function (array, n) {
    if (arguments.length === 1) return array[0];
    return array.slice(0, n);
}

_.invoke = function (list, methodName, ...args) {
    var newList = list.slice();
    var func = _[methodName];
    for (var key in newList) {
        newList[key] = func.apply(this, [newList[key], ...args]);
    }
    return newList;
}

/** intersection_.intersection(*arrays)
Computes the list of values that are the intersection of all the arrays. Each value in the result is present in each of the arrays.

_.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1]);
=> [1, 2]
 */

_.contains = function (list, value, fromIndex) {
    if (!fromIndex) fromIndex = 0;
    for (var i = fromIndex; i < list.length; i++) {
        if (list[i] === value) return true;
    }
    return false;
}

_.every = function (list, predicate, context) {
    if (!context) context = this;
    let every = true;
    for (var key in list) {
        if (!predicate.call(context, list[key])) {
            every = false;
        }
    }
    return every;
}

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
}

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
}






// _.indexOf = function (array, value, bool) {
//     if (arguments.length < 3 || !bool) {
//         for (var i = 0; i < array.length; i++) {
//             if (array[i] === value) return i;
//         }
//         return -1;
//     }
//     function binarySearch(list, name) {
//         var s = 0;
//         var e = list.length - 1;
//         for (var i = 0; i < 10; i++) {
//             var m = Math.floor((e + s) / 2);
//             if (list[m] === name) {
//                 return m;
//             }
//             if (name < list[m]) {
//                 e = m - 1;
//             }
//             if (name > list[m]) {
//                 s = m + 1;
//             }
//         }
//         return -1;
//     }
//     if (bool) {
//         return binarySearch(array, value);
//     }
// };

// _.once = function (func) {
//     var called = true;
//     var result;
//     return function () {
//         if (called) {
//             called = false;
//             result = func.apply(null, arguments);
//             return result;
//         }
//         if (!called) {
//             return result;
//         }
//     };
// };

// _.memoize = function (func) {
//     var cache = {};
//     return function () {
//         if (cache[arguments[0]]) { // might want to stringify this before setting it as a key, so that it can actually be set as a key (if it's an object or an array or something. Use. JSON.stringify(arguments[0]));
//             return cache[arguments[0]];
//         }
//         var result = func.apply(null, arguments);
//         cache[arguments[0]] = result;
//         return result;
//     }; // this should actually also return the cache property on the function, as a function is actually an object that can have properties on it.

//     // define the function by name, then do function.cache = cache;
// };

// _.delay = function (func, wait) {
//     var args = [];
//     for (var i = 2; i < arguments.length; i++) {
//         args.push(arguments[i]);
//     }
//     function doSomething() {

//         return func.apply(null, args);
//     }
//     setTimeout(doSomething, wait);
// };

// _.shuffle = function (list) {
//     var result = [];
//     var copy = list.slice();
//     while (copy.length !== 0) {
//         var random = Math.floor(Math.random() * copy.length);
//         result.push(copy[random]);
//         copy.splice(random, 1);
//     }
//     return result;
// };

// _.invoke = function (list, methodName) {
//     // var args = [];
//     // for (var i = 2; i < arguments.length; i++) {
//     //     args.push(arguments[i]);
//     // }
//     var func = _[methodName];
//     var copy = list.slice();
//     for (var i = 0; i < copy.length; i++) {
//         copy[i] = func(copy[i]);
//     }
//     return copy;
// };

// /** throttle_.throttle(function, wait, [options]) 
// Creates and returns a new, throttled version of the passed function, that, when invoked repeatedly, will only actually call the original function at most once per every wait milliseconds. Useful for rate-limiting events that occur faster than you can keep up with.

// By default, throttle will execute the function as soon as you call it for the first time, and, if you call it again any number of times during the wait period, as soon as that period is over. If you'd like to disable the leading-edge call, pass {leading: false}, and if you'd like to disable the execution on the trailing-edge, pass 
// {trailing: false}.

// var throttled = _.throttle(updatePosition, 100);
// $(window).scroll(throttled); */

// _.throttle = function (func, wait) {
//     func();
//     let flag = true;
//     if (flag) {
//         flag = false;
//         return _.delay(func, wait);
//     }
//     if (!flag) {
//         return _.throttle(func, wait);
//     }
// };


// /** Merges together the values of each of the arrays with the values at the corresponding position. Useful when you have separate data sources that are coordinated through matching array indexes. Use with apply to pass in an array of arrays. If you're working with a matrix of nested arrays, this can be used to transpose the matrix.

//  */


if (typeof module !== 'undefined') {
    module.exports = _;
}
