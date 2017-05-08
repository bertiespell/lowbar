---
layout: default
---

# [](#header-1)LowBar

This is a reimplementation of the underscore library.

<span id="identity"></span>
## [](#identity)_.identity

``` javascript
_.identity = function (val) {
    return val;
};
```

## [](#first)_.first

``` javascript
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
```

## [](#last)_.last

``` javascript
_.last = function (array, n) {
    if ((n || arguments.length) === 1) {
        return array[array.length - 1];
    }
    return _.first(array.reverse(), n).reverse();
};
```

## [](#each)_.each

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