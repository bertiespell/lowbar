# Lowbar

Welcome to my reimplementation of some of the key parts of [underscore.JS](http://underscorejs.org/)! Underscore extends the core JavaScript library to provide a new host of useful functional programming helpers (which I use often in other projects). It does so without extending any built-in objects, instead we build up methods on an underscore object:

``` javascript
var _ = {};
```

This project is hosted on Github Pages [here](https://bertiespell.github.io/lowbar/). Test coverage can be run locally using Node. This will require Node v7.0.0 or higher which you can download and install [here](https://nodejs.org/en/download/).

Clone the project, navigate into the directory and then install the necessary dependencies:

```s
git clone https://github.com/bertiespell/lowbar.git

cd lowbar

npm install

``` 
You can now use npm to run the test scripts:

```s
npm test

```

# [](#header-1)Methods

## [](#identity)_.identity

Returns the same value that is used as the argument. In math: f(x) = x
This function looks useless, but is used throughout Underscore as a default iteratee.

``` javascript
_.identity = function (val) {
    return val;
};
```

## [](#first)_.first

Returns the first element of an array. Passing n will return the first n elements of the array.

``` javascript
_.first = function (array, n) {
    if (!Array.isArray(array)) return;
    if (arguments.length === 1  || n === 1) return array[0];
    return array.slice(0, n);
};
```

## [](#last)_.last

Returns the last element of an array. Passing n will return the last n elements of the array.


``` javascript
_.last = function (array, n) {
    if ((n || arguments.length) === 1) {
        return array[array.length - 1];
    }
    return _.first(array.reverse(), n).reverse();
};
```

## [](#each)_.each

Iterates over a list of elements, yielding each in turn to an iteratee function. The iteratee is bound to the context object, if one is passed. Each invocation of iteratee is called with three arguments: (element, index, list). If list is a JavaScript object, iteratee's arguments will be (value, key, list). Returns the list for chaining.

``` javascript
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
```

## [](#indexOf)_.indexOf

Returns the index at which value can be found in the array, or -1 if value is not present in the array. If you're working with a large array, and you know that the array is already sorted, pass true for isSorted to use a faster binary search ... or, pass a number as the third argument in order to look for the first matching value in the array after the given index.

``` javascript
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
```

## [](#filter)_.filter

Looks through each value in the list, returning an array of all the values that pass a truth test (predicate).

``` javascript
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
```

## [](#reject)_.reject

Returns the values in list without the elements that the truth test (predicate) passes. The opposite of filter.

``` javascript
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
```

## [](#uniq)_.uniq

Produces a duplicate-free version of the array, using === to test object equality. In particular only the first occurence of each value is kept. If you know in advance that the array is sorted, passing true for isSorted will run a much faster algorithm. If you want to compute unique items based on a transformation, pass an iteratee function.

``` javascript
_.uniq = function (array, isSorted, iteratee) {
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
```

## [](#map)_.map

Produces a new array of values by mapping each value in list through a transformation function (iteratee). The iteratee is passed three arguments: the value, then the index (or key) of the iteration, and finally a reference to the entire list.

``` javascript
_.map = function (list, iteratee, context) {
    if (!context) context = this;
    var result = [];
    for (var key in list) {
        result.push(iteratee.apply(context, [list[key], key, list]));
    }
    return result;
};
```

## [](#pluck)_.pluck

A convenient version of what is perhaps the most common use-case for map: extracting a list of property values.

``` javascript
_.pluck = function (list, propertyName) {
    const result = [];
    for (var key in list) {
        result.push(list[key][propertyName]);
    }
    return result;
};
```

## [](#reduce)_.reduce

Also known as inject and foldl, reduce boils down a list of values into a single value. Memo is the initial state of the reduction, and each successive step of it should be returned by iteratee. The iteratee is passed four arguments: the memo, then the value and index (or key) of the iteration, and finally a reference to the entire list.

If no memo is passed to the initial invocation of reduce, the iteratee is not invoked on the first element of the list. The first element is instead passed as the memo in the invocation of the iteratee on the next element in the list.

``` javascript
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
```

## [](#contains)_.contains

Returns true if the value is present in the list. Uses indexOf internally, if list is an Array. Use fromIndex to start your search at a given index.

``` javascript
_.contains = function (list, value, fromIndex) {
    if (!fromIndex) fromIndex = 0;
    for (var i = fromIndex; i < list.length; i++) {
        if (list[i] === value) return true;
    }
    return false;
};
```

## [](#some)_.some

Returns true if any of the values in the list pass the predicate truth test. Short-circuits and stops traversing the list if a true element is found.

``` javascript
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
```

## [](#extend)_.extend

Shallowly copy all of the properties in the source objects over to the destination object, and return the destination object. Any nested objects or arrays will be copied by reference, not duplicated. It's in-order, so the last source will override properties of the same name in previous arguments.

``` javascript
_.extend = function (destination) {
    for (var i = 1; i < arguments.length; i++) {
        for (var key in arguments[i]) {
            destination[key] = arguments[i][key];
        }
    }
    return destination;
};
```

## [](#default)_.default

Fill in undefined properties in object with the first value present in the following list of defaults objects.

``` javascript
_.defaults = function (object, defaults) {
  for (var key in defaults) {
    if (!object[key]) {
      object[key] = defaults[key]
    }
  }
  return object;
};
```

## [](#once)_.once

Creates a version of the function that can only be called one time. Repeated calls to the modified function will have no effect, returning the value from the original call. Useful for initialization functions, instead of having to set a boolean flag and then check it later.

``` javascript
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
```

## [](#memoize)_.memoize

Memoizes a given function by caching the computed result. Useful for speeding up slow-running computations. If passed an optional hashFunction, it will be used to compute the hash key for storing the result, based on the arguments to the original function. The default hashFunction just uses the first argument to the memoized function as the key. The cache of memoized values is available as the cache property on the returned function.

``` javascript
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
```

## [](#delay)_.delay

Much like setTimeout, invokes function after wait milliseconds. If you pass the optional arguments, they will be forwarded on to the function when it is invoked.

``` javascript
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
```

## [](#zip)_.zip

Merges together the values of each of the arrays with the values at the corresponding position. Useful when you have separate data sources that are coordinated through matching array indexes. Use with apply to pass in an array of arrays. If you're working with a matrix of nested arrays, this can be used to transpose the matrix.

``` javascript
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
```

## [](#sortedIndex)_.sortedIndex

Uses a binary search to determine the index at which the value should be inserted into the list in order to maintain the list's sorted order. If an iteratee function is provided, it will be used to compute the sort ranking of each value, including the value you pass. The iteratee may also be the string name of the property to sort by (eg. length).

``` javascript
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
```

## [](#sortBy)_.sortBy

Returns a (stably) sorted copy of list, ranked in ascending order by the results of running each value through iteratee. iteratee may also be the string name of the property to sort by (eg. length).

``` javascript
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
```

## [](#flatten)_.flatten

Flattens a nested array (the nesting can be to any depth). If you pass shallow, the array will only be flattened a single level.

``` javascript
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
```

## [](#shuffle)_.shuffle

Returns a shuffled copy of the list, using a version of the Fisher-Yates shuffle.

``` javascript
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
```

## [](#invoke)_.invoke

Calls the method named by methodName on each value in the list. Any extra arguments passed to invoke will be forwarded on to the method invocation.

``` javascript
_.invoke = function (list, methodName, ...args) {
    var newList = list.slice();
    var func = _[methodName];
    for (var key in newList) {
        newList[key] = func.apply(this, [newList[key], ...args]);
    }
    return newList;
};
```

## [](#every)_.every

Returns true if all of the values in the list pass the predicate truth test. Short-circuits and stops traversing the list if a false element is found.

``` javascript
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
```

## [](#intersection)_.intersection

Computes the list of values that are the intersection of all the arrays. Each value in the result is present in each of the arrays.

``` javascript
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
```

## [](#difference)_.difference

Similar to without, but returns the values from array that are not present in the other arrays.

``` javascript
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
```

## [](#throttle)_.throttle

Creates and returns a new, throttled version of the passed function, that, when invoked repeatedly, will only actually call the original function at most once per every wait milliseconds. Useful for rate-limiting events that occur faster than you can keep up with.

``` javascript
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
```