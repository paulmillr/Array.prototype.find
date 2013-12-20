var assert = require('assert');
var assertEquals = assert.equal;
var assertThrows = assert['throws'];

require('../index.js');

assertEquals(Array.prototype.propertyIsEnumerable('find'), false);

assertThrows(function() { [1].find() }, TypeError);
assertThrows(function() { [1].find(false) }, TypeError);
assertThrows(function() { [1].find(NaN) }, TypeError);
assertThrows(function() { [1].find(null) }, TypeError);

var numbers = [1,2,3,4,5,6,7,8,9,10];
assertEquals(numbers.find(function(x) {
  return x < 3;
}), 1);

assertEquals(numbers.find(function(x) {
  return x % 2 == 0;
}), 2);

assertEquals(numbers.find(function(x) {
  return x == 11;
}), undefined);

var result = numbers.find(function(x) {
  return x == this.index;
}, { index: 2 });
assertEquals(result, 2);

var find = Array.prototype.find;

assertThrows(function() { find.call(numbers, undefined); }, TypeError);
assertEquals(find.call([], function() {}), undefined);
assertEquals(find.call(numbers, function(x) {
  return x % 3 == 0;
}), 3);


