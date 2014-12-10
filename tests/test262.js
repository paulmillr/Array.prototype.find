var chai = require('chai');
require('../index');

var globalThis = global;

describe('Test 262: Array.prototype.find', function () {
    function runTestCase(fn) {
        chai.assert(fn(), 'Test did not pass');
    }

    function $ERROR(message) {
        chai.assert(false, message);
    }

    var assert = {
        sameValue: function (actual, expected, message) {
            chai.assert.strictEqual(actual, expected, message);
        },
        notSameValue: function (actual, expected, message) {
            chai.assert.notStrictEqual(actual, expected, message);
        }
    };

    var supportsGetters = (function () {
        var value = 2;
        var obj = {};

        if (!Object.defineProperty) {
            return false;
        }
        Object.defineProperty(obj, 'foo', {
            get: function () {
                return value * 2;
            }
        });
        value = 4;

        return obj.foo === 8;
    }());

    /*
    Test Array.prototype.find_callable-predicate ignored: Uses Proxy and arrow functions
    */
    specify('Array.prototype.find_empty-array-undefined', function () {
        // Copyright (c) 2014 Matthew Meyers. All rights reserved.
        // This code is governed by the BSD license found in the LICENSE file.
        
        /*---
        description: Find on empty array should return undefined
        ---*/
        
        var a = [].find(function () {
            return true;
        });
        
        if (a !== undefined) {
            $ERROR('#1: a !== undefined. Actual: ' + typeof a);
        }
        
    });
    specify('Array.prototype.find_length-property', function () {
        // Copyright (c) 2014 Matthew Meyers. All rights reserved.
        // This code is governed by the BSD license found in the LICENSE file.
        
        /*---
        description: The length property of the find method is 1
        ---*/
        
        if ([].find.length !== 1) {
            $ERROR('1: [].find.length !== 1. Actual: ' + [].find.length);
        }
        
    });
    specify('Array.prototype.find_modify-after-start', function () {
        // Copyright (c) 2014 Matthew Meyers. All rights reserved.
        // This code is governed by the BSD license found in the LICENSE file.
        
        /*---
        description: Array may be mutated by calls to the predicate
        ---*/
        
        [1, 2, 3].find(function (v, i, arr) {
            arr[i + 1] = arr[i + 1] + 1;
            switch (i) {
                case 0:
                    if (arr[i] !== 1) {
                        $ERROR('#1: arr[0] !== 1. Actual: ' + arr[i]);
                    }
                    break;
                case 1:
                    if (arr[i] !== 3) {
                        $ERROR('#2: arr[1] !== 3. Actual: ' + arr[i]);
                    }
                    break;
                case 2:
                    if (arr[i] !== 4) {
                        $ERROR('#3: arr[1] !== 4. Actual: ' + arr[i]);
                    }
                    break;
            }
        });
        
    });
    specify('Array.prototype.find_non-returning-predicate', function () {
        // Copyright (c) 2014 Matthew Meyers. All rights reserved.
        // This code is governed by the BSD license found in the LICENSE file.
        
        /*---
        description: Find with a predicate with no return value should return undefined
        ---*/
        
        var a = [1, 2, 3].find(function () {});
        
        if (a !== undefined) {
            $ERROR('#1: a !== undefined. Actual: ' + typeof a);
        }
        
    });
    specify('Array.prototype.find_noncallable-predicate', function () {
        // Copyright (c) 2014 Matthew Meyers. All rights reserved.
        // This code is governed by the BSD license found in the LICENSE file.
        
        /*---
        description: >
            Array.prototype.find should throw a TypeError if
            IsCallable(predicate) is false
        includes: [runTestCase.js]
        ---*/
        
        var uncallableValues = [
            undefined,
            null,
            true,
            this,
            {},
            'string',
            0
        ];
        
        function testcase() {
            for (var i = 0, len = uncallableValues.length; i < len; i++) {
                try {
                    [].find(uncallableValues[i]);
                    return false;
                } catch (e) {
                    if (!(e instanceof TypeError)) {
                        return false;
                    }
                }
            }
            return true;
        }
        
        runTestCase(testcase);
        
    });
    specify('Array.prototype.find_predicate-arguments', function () {
        // Copyright (c) 2014 Matthew Meyers. All rights reserved.
        // This code is governed by the BSD license found in the LICENSE file.
        
        /*---
        description: >
            predicate is called with three arguments: the value of the
            element, the index of the element, and the object being traversed.
        ---*/
        
        var a = [1];
        
        var b = a.find(function (v, i, arr) {
            if (arguments.length !== 3) {
                $ERROR('#1: arguments.length !== 3. Actual: ' + arguments.length);
            }
            if (v !== 1) {
                $ERROR('#2: element value !== 1. Actual: ' + v);
            }
            if (i !== 0) {
                $ERROR('#3: index !== 0. Actual: ' + i);
            }
            if (arr !== a) {
                $ERROR('#4: object being traversed !== a');
            }
        });
        
    });
    specify('Array.prototype.find_push-after-start', function () {
        // Copyright (c) 2014 Matthew Meyers. All rights reserved.
        // This code is governed by the BSD license found in the LICENSE file.
        
        /*---
        description: >
            Elements added to array after find has been called should not be
            visited
        ---*/
        
        [1].find(function (v, i, arr) {
            arr.push('string');
            if (v === 'string') {
                $ERROR('#' + i + ': \'string\' should not be visited');
            }
        });
        
    });
    specify('Array.prototype.find_remove-after-start', function () {
        // Copyright (c) 2014 Matthew Meyers. All rights reserved.
        // This code is governed by the BSD license found in the LICENSE file.
        
        /*---
        description: >
            Elements removed from array after find has been called should not
            be visited
        ---*/
        
        [1, 'string', 2].find(function (v, i, arr) {
            var stringIndex = arr.indexOf('string');
            if (stringIndex !== -1) delete arr[stringIndex];
            if (v === 'string') {
                $ERROR('#1: \'string\' should not exist, it has been deleted');
            }
            if (v === undefined) {
                $ERROR('#2: deleted element should not be visited');
            }
        });
        
        [1, 'string', 2].find(function (v, i, arr) {
            var stringIndex = arr.indexOf('string');
            if (stringIndex !== -1) arr.splice(stringIndex, 1);
            if (v === 'string') {
                $ERROR('#3: \'string\' should not exist, it has been deleted');
            }
            if (v === undefined) {
                $ERROR('#4: deleted element should not be visited');
            }
        });
        
    });
    specify('Array.prototype.find_return-found-value', function () {
        // Copyright (c) 2014 Matthew Meyers. All rights reserved.
        // This code is governed by the BSD license found in the LICENSE file.
        
        /*---
        description: Find should return value if predicate returns true
        ---*/
        
        var testVals = [
            undefined,
            null,
            0,
            'string',
            String,
            this,
            true,
            [1,2,3]
        ];
        
        var a;
        
        for (var i = 0, len = testVals.length; i < len; i++) {
            a = testVals.find(function (v) {
                return v === testVals[i];
            });
            if (a !== testVals[i]) {
                $ERROR('#' + (i + 1) + ': a !== testVals[' + i + ']. Actual: ' + a);
            }
        }
        
    });
    specify('Array.prototype.find_skip-empty', function () {
        // Copyright (c) 2014 Matthew Meyers. All rights reserved.
        // This code is governed by the BSD license found in the LICENSE file.
        
        /*---
        description: >
            predicate is called only for elements of the array which actually
            exist; it is not called for missing elements of the array
        ---*/
        
        var a = [];
        
        a[10] = 1;
        a[11] = 2;
        
        var b = a.find(function (v) {
            return v !== 1;
        });
        
        if (b !== 2) {
            $ERROR('#1: b !== 2. Actual: ' + b);
        }
        
    });
    specify('Array.prototype.find_this-defined', function () {
        // Copyright (c) 2014 Matthew Meyers. All rights reserved.
        // This code is governed by the BSD license found in the LICENSE file.
        
        /*---
        description: thisArg should be bound to this if provided
        ---*/
        
        [1].find(function () {
            assert.sameValue(this, Array, 'this should equal Array');
            assert.notSameValue(this, globalThis, 'this should not equal globalThis');
        }, Array);
        
    });
    specify('Array.prototype.find_this-is-object', function () {
        // Copyright (c) 2014 Matthew Meyers. All rights reserved.
        // This code is governed by the BSD license found in the LICENSE file.
        
        /*---
        description: Array.prototype.find should convert thisArg into an object
        ---*/
        
        var dataTypes = [
            undefined,
            null,
            true,
            this,
            {},
            'string',
            0,
            function () {}
        ]
        
        for (var i = 0, len = dataTypes.length; i < len; i++) {
            [1].find(function () {
                if (!(this instanceof Object)) {
                  $ERROR('#' + i + ': !(this instanceof Object). Actual: ' + typeof this);
                }
            }, dataTypes[i])
        }
        
    });
    specify('Array.prototype.find_this-undefined', function () {
        // Copyright (c) 2014 Matthew Meyers. All rights reserved.
        // This code is governed by the BSD license found in the LICENSE file.
        
        /*---
        description: thisArg should be undefined if not provided
        ---*/
        
        [1].find(function () {
            if (this !== globalThis) {
              $ERROR('#1: this !== globalThis');
            }
        });
        
    });
});
