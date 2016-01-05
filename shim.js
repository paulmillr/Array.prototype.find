'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimArrayPrototypeFind() {
	var polyfill = getPolyfill();
	if (Array.prototype.find !== polyfill) {
		define(Array.prototype, { find: polyfill });
	}
	return polyfill;
};