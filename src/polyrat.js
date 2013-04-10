/*
 * rational.js - Javascript tools and libraries based around rational numbers.
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
 * @class Rational Polynumber (of arbitrary dimension)
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
	return [
		[], // multi-dimensional array of coefficients
		[] // array of coefficient offsets
	];
};

/**
 * Creates a new polynumber initialized with the given array of values
 *
 * @param {Array} array of values (of type "rat")
 * @returns {polyrat} a new polynumber
 */
polyrat.fromValues = function(a) {
	var out = polyrat.create();
	out[0] = a.slice(0);
	return rat.normalize(out, out);
};

/**
 * Add another variable/dimension to a polynumber
 *
 * @param {polyrat} out the receiving number
 * @param {rat} a the first operand
 * @param {Array} array of values (of type "rat")
 * @returns {polyrat} a new polynumber
 */
polyrat.mergeDimension = function(out, a, m) {
	out[0] = [a.slice(0)];
	for (var i in m) out[0].push(m[i]);
	return out;
};

/**
 * Evaluate a polynomial for a certain variable(s)
 *
 * @param {rat} out the receiving number
 * @param {polyrat} a the polynumber to evaluate 
 * @param {Array} array of values (of type "rat") to plug in to the polynomial
 * @returns {rat} resulting rational number
 */
polyrat.evaluate = function(out, a, m) {
	out[1] = [a.slice(0)];
	for (var i in m) out[1].push(m[i]);
	/*
	
		x = x * plot_scale[0] - plot_origin[0];
		y = plot_origin[1] - y * plot_scale[1];
		var result = 0;
		for (var b in self.m) {
			for (var a in self.m[b]) {
				result += self.m[b][a] * Math.pow(x, a) * Math.pow(y, b);
			}
		}
		return result;
	
	*/
	return out;
};

/**
 * Returns a string representation
 *
 * @param {polyrat} a rational polynumber to represent as a string
 * @returns {String} string representation of the number
 */
polyrat.str = function (a) {
	return a[1].toString();
};

/**
 * Normalize a polynumber
 *
 * @param {polyrat} out the receiving number
 * @param {polyrat} a number to normalize
 * @returns {polyrat} out
 */
polyrat.normalize = function(out, a) {
	out[0] = a[0];
	out[1] = a[1];
	return out;
};

/**
 * Zero, the additive identity
 *
 * @property POLYRAT_ZERO
 * @type Array
 * @static
 * @final
 */
var POLYRAT_ZERO = polyrat.fromValues([0]);

/**
 * One, the multiplicative identity
 *
 * @property RAT_ONE
 * @type RAT_ARRAY_TYPE
 * @static
 * @final
 */
var POLYRAT_IDENTITY = polyrat.fromValues([1]);
