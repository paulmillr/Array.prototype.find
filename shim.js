'use strict';

var define = require('define-properties');
var shimUnscopables = require('es-shim-unscopables');

var getPolyfill = require('./polyfill');

module.exports = function shimArrayPrototypeFind() {
	var polyfill = getPolyfill();

	define(
		Array.prototype,
		{ find: polyfill },
		{
			find: function () { return Array.prototype.find !== polyfill; }
		}
	);

	shimUnscopables('find');

	return polyfill;
};
