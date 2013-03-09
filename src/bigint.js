/*
 * rational.js - Javascript tools and libraries based around bigintional numbers.
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
 * @class Integer of Arbitrary Size
 * @name bigint
 */
var bigint = {};

/**
 * Creates a new, empty bigint
 *
 * @returns {bigint} a new bigint
 */
bigint.create = function() {
	return [0];
};

/**
 * Creates a new bigint initialized with values from an existing number
 *
 * @param {bigint} a number to clone
 * @returns {bigint} a new bigintional number
 */
bigint.clone = function(a) {
	var out = [];
	for (var i=0, l=a.length; i<l; i++)
		out[i] = a[i];
	return out;
};

/**
 * Copy the values from one bigint to another
 *
 * @param {bigint} out the receiving number
 * @param {bigint} a the source number
 * @returns {bigint} out
 */
bigint.copy = function(out, a) {
	out = [];
	for (var i=0, l=a.length; i<l; i++)
		out[i] = a[i];
	return out;
};

/**
 * Absolute value of a bigint
 *
 * @param {bigint} out the receiving number
 * @param {bigint} a number to take the absolute value of
 * @returns {bigint} out
 */
bigint.abs = function(out, a) {
	out[0] = Math.abs(a[0]);
	return out;
};

/**
 * Returns a string representation
 *
 * @param {bigint} a number to represent as a string
 * @returns {String} string representation of the number
 */
bigint.str = function (a) {
	return a[0].toString();
};

/**
 * Returns an integer to it's native type
 *
 * @param {bigint} a number to return as an integer
 * @returns {Integer} an integer or Infinity when the max size is exceeded
 */
bigint.toInteger = function (a) {
	return out[0];
};

/**
 * Returns a bigint from an integer
 *
 * @param {bigint} out the receiving number
 * @param {Integer} integer
 * @returns {bigint} out
 */
bigint.fromInteger = function (a) {
	return [parseInt(a)];
};

/**
 * Zero, the additive identity
 *
 * @property bigint_ZERO
 * @type bigint_ARRAY_TYPE
 * @static
 * @final
 */
var bigint_ZERO = bigint.fromInteger(0);

/**
 * One, the multiplicative identity
 *
 * @property bigint_ONE
 * @type bigint_ARRAY_TYPE
 * @static
 * @final
 */
var bigint_ONE = bigint.fromInteger(1);