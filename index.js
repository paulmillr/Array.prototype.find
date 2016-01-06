'use strict';

var define = require('define-properties');
var ES = require('es-abstract/es6');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var shim = require('./shim');

var slice = Array.prototype.slice;

var boundFindShim = function find(array, predicate) {
	ES.RequireObjectCoercible(array);
	return implementation.apply(array, predicate);
};

define(boundFindShim, {
	implementation: implementation,
	getPolyfill: getPolyfill,
	shim: shim
});

module.exports = boundFindShim;
