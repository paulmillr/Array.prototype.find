// Array.prototype.find - MIT License (c) 2013 Paul Miller <http://paulmillr.com>
// For all details and docs: https://github.com/paulmillr/array.prototype.find
(function(globals){
  if (Array.prototype.find) return;

  var maxInteger = Number.MAX_SAFE_INTEGER || (Math.pow(2, 53) - 1);

  var find = function(predicate) {
    var list = Object(this);
    // Loose implementation of ToLength:
    // * It does not deal with negative numbers correctly, but it does not
    // matter because it will iterate between 0 and length
    // * It only casts to Integer (with |0) after making sure it has the maximum
    // integer or |0 will cast Infinity to 0
    var length = Math.min(Number(list.length), maxInteger) | 0;
    if (typeof predicate !== 'function' || Object.prototype.toString.call(predicate) !== '[object Function]') {
      throw new TypeError('Array#find: predicate must be a function');
    }
    if (length <= 0) return;
    var thisArg = arguments[1];
    for (var i = 0, value; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) return value;
    }
  };

  if (Object.defineProperty) {
    try {
      Object.defineProperty(Array.prototype, 'find', {
        value: find, configurable: true, enumerable: false, writable: true
      });
    } catch(e) {}
  }

  if (!Array.prototype.find) {
    Array.prototype.find = find;
  }
})(this);
