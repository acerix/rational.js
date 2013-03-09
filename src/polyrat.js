/*
 * rational.js - Javascript tools and libraries based around polyrational numbers.
 * Copyright (C) 2013 Dylan Ferris
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

/**
 * @class Rational Polynumber
 * @name polyrat
 * @requires rat
 */
var polyrat = {};

/**
 * Creates a new, empty polyrat
 *
 * @returns {polyrat} a new polynumber
 */
polyrat.create = function() {
	return [];
};

/**
 * Creates a new polynumber initialized with the given values
 *
 * @param {Array} 2D array of values
 * @returns {polyrat} a new polynumber
 */
polyrat.fromValues = function(a) {
	var out = [];
	for (var i in a) {
		out[i] = [];
		for (var j in a[i]) {
			out[i][j] = rat.fromInteger(a[i][j]);
		}
	}
	return out;
};

/**
 * Returns a string representation
 *
 * @param {rat} a rational polynumber to represent as a string
 * @returns {String} string representation of the number
 */
polyrat.str = function (a) {
	return a[0][0][0].toString();
};

/**
 * Zero, the additive identity
 *
 * @property POLYRAT_ZERO
 * @type Array
 * @static
 * @final
 */
var POLYRAT_ZERO = polyrat.fromValues([[0]]);

/**
 * One, the multiplicative identity
 *
 * @property RAT_ONE
 * @type RAT_ARRAY_TYPE
 * @static
 * @final
 */
var POLYRAT_IDENTITY = polyrat.fromValues([[1]]);
