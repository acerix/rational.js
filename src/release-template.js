/*
 * rational.js - Javascript tools and libraries based around rational numbers.
 * Copyright (C) 2015 Dylan Ferris
 *
 * This file is part of rational.js.
 *
 * rational.js is free software: you may redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * rational.js is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with rational.js.  If not, see <http://www.gnu.org/licenses/>.
 */

(function(_global) {
	"use strict";
	var shim = {};
	if (typeof(exports) === 'undefined') {
		if(typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
			shim.exports = {};
			define(function() {
				return shim.exports;
			});
		} else {
			// browser, define in global
			shim.exports = typeof(window) !== 'undefined' ? window : _global;
		}
	}
	else {
		// commonjs, define in exports
		shim.exports = exports;
	}
	(function(exports) {
COMPILED_JAVASCRIPT_GOES_HERE
	})(shim.exports);
})(this);

