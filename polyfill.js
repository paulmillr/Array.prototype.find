'use strict';

module.exports = function getPolyfill() {
	return Array.prototype.find || require('./implementation');
};