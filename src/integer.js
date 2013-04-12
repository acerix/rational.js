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

'use strict';

/**
 * @class Integer
 * @name integer
 */
var integer = {};

/**
 * Find the greatest common divisor of two integers
 *
 * @param {Integer} a the first operand
 * @param {Integer} b the second operand
 * @returns {Integer} greatest common divisor
 */
integer.greatest_common_divisor = function(a, b) {
	if (b===1 || a===1) return 1;
	var t;
	while (b !== 0) {
		t = b;
		b = a % b;
		if (!isFinite(b)) return 0;
		a = t;
	}
	return a;
}

/**
 * Alias for {@link integer.greatest_common_divisor}
 * @function
 */
integer.gcd = integer.greatest_common_divisor;

/**
 * Returns a new random unsigned integer with a maximum size specified in bytes
 *
 * @param {Integer} maximum number of bits
 * @returns {Integer} a random integer from Zero to 2^bytes (inclusive)
 */
integer.fromRandom = function(bits) {
	return Math.random() * (1 << bits) >>> 0;
};

/**
 * Returns a new unsigned integer with the number of milliseconds since the Unix epoch
 *
 * @returns {Integer} milliseconds since the 60's ended
 */
integer.fromMillitime = function() {
	return +new Date;
};

/**
 * Returns a new unsigned integer with the number of milliseconds since the Unix epoch
 *
 * @returns {Integer} milliseconds since the 60's ended
 */
integer.fromUnixtime = function() {
	return integer.fromMillitime() / 1000 | 0;
};
