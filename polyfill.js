'use strict';

module.exports = function getPolyfill() {
	// Detect if an implementation exists
	// Detect early implementations which skipped holes in sparse arrays
  // eslint-disable-next-line no-sparse-arrays
	var implemented = Array.prototype.find && [, 1].find(function (item, index) {
		return index === 0;
	});

  // eslint-disable-next-line global-require
	return implemented ? Array.prototype.find : require('./implementation');
};
