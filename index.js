'use strict';

var define = require('define-properties');
var ES = require('es-abstract/es6');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var shim = require('./shim');

var slice = Array.prototype.slice;

var boundFindShim = function find(array, predicate) {
	ES.RequireObjectCoercible(array);
	var args = Array.prototype.slice.call(arguments, 1);
	return implementation.apply(array, args);
};

define(boundFindShim, {
	implementation: implementation,
	getPolyfill: getPolyfill,
	shim: shim
});

module.exports = boundFindShim;
