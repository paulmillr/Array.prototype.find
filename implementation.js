// Array.prototype.find - MIT License (c) 2013 Paul Miller <http://paulmillr.com>
// For all details and docs: https://github.com/paulmillr/array.prototype.find
'use strict';
var ES = require('es-abstract/es6');

module.exports = function find (predicate) {
  var list = ES.ToObject(this);
  var length = ES.ToUint32(ES.ToLength(list.length));
  if (length === 0) return undefined;
  if (!ES.IsCallable(predicate)) {
    throw new TypeError('Array#find: predicate must be a function');
  }
  var thisArg = arguments[1];
  for (var i = 0, value; i < length; i++) {
    value = list[i];
    if (ES.Call(predicate, thisArg, [value, i, list])) return value;
  }
  return undefined;
};
