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

if(!RAT_ARRAY_TYPE) {
	var RAT_ARRAY_TYPE = typeof Int32Array !== 'undefined' ? Int32Array : Array;
}

/**
 * @class Rational Number
 * @name rat
 * @requires integer
 */
var rat = {};

/**
 * Creates a new, empty rat
 *
 * @returns {rat} a new rational number
 */
rat.create = function() {
	var out = new RAT_ARRAY_TYPE(2);
	out[0] = 0;
	out[1] = 1;
	return out;
};

/**
 * Creates a new rat initialized with values from an existing number
 *
 * @param {rat} a number to clone
 * @returns {rat} a new rational number
 */
rat.clone = function(a) {
	var out = new RAT_ARRAY_TYPE(2);
	out[0] = a[0];
	out[1] = a[1];
	return out;
};

/**
 * Creates a new rat initialized with the given values
 *
 * @param {Number} n Numerator
 * @param {Number} d Denominator
 * @returns {rat} a new rational number
 */
rat.fromValues = function(n, d) {
	var out = new RAT_ARRAY_TYPE(2);
	out[0] = n;
	out[1] = d;
	return rat.normalize(out, out);
};

/**
 * Copy the values from one rat to another
 *
 * @param {rat} out the receiving number
 * @param {rat} a the source number
 * @returns {rat} out
 */
rat.copy = function(out, a) {
	out[0] = a[0];
	out[1] = a[1];
	return out;
};

/**
 * Set the components of a rat to the given values
 *
 * @param {rat} out the receiving number
 * @param {Number} n Numerator
 * @param {Number} d Denominator
 * @returns {rat} out
 */
rat.set = function(out, n, d) {
	out[0] = n;
	out[1] = d;
	return rat.normalize(out, out);
};

/**
 * Absolute value of a rat
 *
 * @param {rat} out the receiving number
 * @param {rat} a number to take the absolute value of
 * @returns {rat} out
 */
rat.abs = function(out, a) {
	out[0] = Math.abs(a[0]);
	out[1] = a[1];
	return out;
};

/**
 * Inverts a rat
 *
 * @param {rat} out the receiving number
 * @param {rat} a number to invert
 * @returns {rat} out
 */
rat.invert = function(out, a) {
	out[0] = a[1];
	out[1] = a[0];
	return out;
};

/**
 * Adds two rats
 *
 * @param {rat} out the receiving number
 * @param {rat} a the first operand
 * @param {rat} b the second operand
 * @returns {rat} out
 */
rat.add = function(out, a, b) {
	out[0] = a[0] * b[1] + b[0] * a[1];
	out[1] = a[1] * b[1];
	return rat.normalize(out, out);
};

/**
 * Subtracts two rats
 *
 * @param {rat} out the receiving number
 * @param {rat} a the first operand
 * @param {rat} b the second operand
 * @returns {rat} out
 */
rat.subtract = function(out, a, b) {
	out[0] = a[0] * b[1] - b[0] * a[1];
	out[1] = a[1] * b[1];
	return rat.normalize(out, out);
};

/**
 * Alias for {@link rat.subtract}
 * @function
 */
rat.sub = rat.subtract;

/**
 * Multiplies two rats
 *
 * @param {rat} out the receiving number
 * @param {rat} a the first operand
 * @param {rat} b the second operand
 * @returns {rat} out
 */
rat.multiply = function(out, a, b) {
	out[0] = a[0] * b[0];
	out[1] = a[1] * b[1];
	return rat.normalize(out, out);
};

/**
 * Alias for {@link rat.multiply}
 * @function
 */
rat.mul = rat.multiply;

/**
 * Divides two rats
 *
 * @param {rat} out the receiving number
 * @param {rat} a the first operand
 * @param {rat} b the second operand
 * @returns {rat} out
 */
rat.divide = function(out, a, b) {
	out[0] = a[0] * b[1];
	out[1] = a[1] * b[0];
	return rat.normalize(out, out);
};

/**
 * Alias for {@link rat.divide}
 * @function
 */
rat.div = rat.divide;

/**
 * Returns true when the first rat is equal to the second
 *
 * @param {rat} a the first operand
 * @param {rat} b the second operand
 * @returns {Bool} true when the two rats are equal
 */
rat.equals = function(a, b) {
	return a[0] === b[0] && a[1] === b[1];
};

/**
 * Returns true when the first rat is larger than the second
 *
 * @param {rat} a the first operand
 * @param {rat} b the second operand
 * @returns {Bool} true when the first operand is larger
 */
rat.isGreaterThan = function(a, b) {
	return a[0] * b[1] > b[0] * a[1];
};

/**
 * Returns true when the first rat is smaller than the second
 *
 * @param {rat} a the first operand
 * @param {rat} b the second operand
 * @returns {Bool} true when the first operand is smaller
 */
rat.isLessThan = function(a, b) {
	return a[0] * b[1] < b[0] * a[1];
};

/**
 * Returns true when the rat is negative
 *
 * @param {rat} a the number to check
 * @returns {Bool} true when the number is less than zero
 */
rat.isNegative = function(a) {
	return a[0] < 0;
};

/**
 * Returns the minimum of two rats
 *
 * @param {rat} out the receiving number
 * @param {rat} a the first operand
 * @param {rat} b the second operand
 * @returns {rat} out
 */
rat.min = function(out, a, b) {
	if (rat.isLessThan(a, b)) {
		out[0] = a[0];
		out[1] = a[1];
	}
	else {
		out[0] = b[0];
		out[1] = b[1];
	}
	return out;
};

/**
 * Returns the maximum of two rats
 *
 * @param {rat} out the receiving number
 * @param {rat} a the first operand
 * @param {rat} b the second operand
 * @returns {rat} out
 */
rat.max = function(out, a, b) {
	if (rat.isGreaterThan(a, b)) {
		out[0] = a[0];
		out[1] = a[1];
	}
	else {
		out[0] = b[0];
		out[1] = b[1];
	}
	return out;
};

/**
 * Multiplies a rat's numerator by an integer
 *
 * @param {rat} out the receiving number
 * @param {rat} a the number to multiply
 * @param {Integer} b amount to multiply the number by
 * @returns {rat} out
 */
rat.scalar_multiply = function(out, a, b) {
	out[0] = a[0] * b;
	out[1] = a[1];
	return rat.normalize(out, out);
};


/**
 * Multiplies a rat's denominator by an integer
 *
 * @param {rat} out the receiving number
 * @param {rat} a the number to divide
 * @param {Integer} b amount to divide by
 * @returns {rat} out
 */
rat.scalar_divide = function(out, a, b) {
	out[0] = a[0];
	out[1] = a[1] * b;
	return rat.normalize(out, out);
};

/**
 * Normalize a rat
 *
 * @param {rat} out the receiving number
 * @param {rat} a number to normalize
 * @returns {rat} out
 */
rat.normalize = function(out, a) {
	out[0] = a[0];
	out[1] = a[1];
	if (out[1] === 0) return out;
	if (out[1] < 0) {
		out[0] = -out[0];
		out[1] = -out[1];
	}
	var gcd = integer.greatest_common_divisor(Math.abs(out[0]), out[1]);
	if (gcd > 1) {
		out[0] /= gcd;
		out[1] /= gcd;
	}
	return out;
};

/**
 * Negates a rat
 *
 * @param {rat} out the receiving number
 * @param {rat} a number to negate
 * @returns {rat} out
 */
rat.opposite = function(out, a) {
	out[0] = -a[0];
	out[1] = a[1];
	return out;
};

/**
 * Alias for {@link rat.opposite}
 * @function
 */
rat.neg = rat.negative = rat.opposite;

/**
 * Raises a rat to an integer exponent
 *
 * @param {rat} out the receiving number
 * @param {rat} a the number to exponentiate
 * @param {Integer} b power to raise the number by
 * @returns {rat} out
 */
rat.power = function(out, a, b) {
	out[0] = Math.pow(a[0], b);
	out[1] = Math.pow(a[1], b);
	return out;
};

/**
 * Alias for {@link rat.power}
 * @function
 */
rat.pow = rat.power;

/**
 * Calculates the dot product of two rats
 *
 * @param {rat} a the first operand
 * @param {rat} b the second operand
 * @returns {Number} dot product of a and b
 */
rat.dot = function (a, b) {
	return a[0] * b[0] + a[1] * b[1];
};

/**
 * Returns a string representation
 *
 * @param {rat} a number to represent as a string
 * @returns {String} string representation of the number
 */
rat.str = function (a) {
	return a[1] === 1 ? a[0] : a[0] + '/' + a[1];
};

/**
 * Returns a decimal approximation
 *
 * @param {rat} a number to approximate as a decimal
 * @returns {Float} decimal approximation of the number
 */
rat.toDecimal = function (a) {
	return a[0] / a[1];
};

/**
 * Alias for {@link rat.toDecimal}
 * @function
 */
rat.dec = rat.toDecimal;

/**
 * Returns the closest integer approximation
 *
 * @param {rat} a number to round to the nearest integer
 * @returns {Integer} integer approximation of the number
 */
rat.toInteger = function (a) {
	return Math.round(rat.toDecimal(a));
};

/**
 * Alias for {@link rat.toInteger}
 * @function
 */
rat.round = rat.toInteger;

/**
 * Returns the closest integer approximation by rounding down
 *
 * @param {rat} a number to round down to the nearest integer
 * @returns {Integer} integer approximation of the number
 */
rat.floor = function (a) {
	return Math.floor(rat.toDecimal(a));
};

/**
 * Returns the closest integer approximation by rounding up
 *
 * @param {rat} a number to round up to the nearest integer
 * @returns {Integer} integer approximation of the number
 */
rat.ceil = function (a) {
	return Math.ceil(rat.toDecimal(a));
};

/**
 * Returns a rat from an integer
 *
 * @param {Integer} signed integer
 * @returns {rat} out
 */
rat.fromInteger = function (a) {
	var out = new RAT_ARRAY_TYPE(2);
	out[0] = parseInt(a);
	out[1] = 1;
	return rat.normalize(out, out);
};

/**
 * Returns a rat from a decimal number
 *
 * @param {Number} a decimal number
 * @returns {rat} out
 */
rat.fromDecimal = function (a) {
	a = parseFloat(a);
	if (a===0) return rat.clone(RAT_ZERO);
	if (a===1) return rat.clone(RAT_ONE);
	if (a===Infinity) return rat.clone(RAT_INFINITY);
	if (isNaN(a)) return rat.clone(RAT_INFINULL);
	if (a%1===0) return rat.fromInteger(a);
	var neg = a < 0;
	if (neg) a = Math.abs(a);
	var test = 1;
	var m = [1, 0, 0, 1];
	// traverse the Stern-Brocot tree until a match is found
	while (test !== a) {
		if (test > a) {
			m[0] += m[1];
			m[2] += m[3];
		}
		else {
			m[1] += m[0];
			m[3] += m[2];
		}
		test = (m[0] + m[1]) / (m[2] + m[3]);
	}
	var out = rat.fromValues( m[0] + m[1] , m[2] + m[3] );
	if (neg) rat.neg(out, out);
	return out;
};

/**
 * Creates a new rat from two random integers
 *
 * @returns {rat} a random rational number
 */
rat.fromRandom = function() {
	var out = new RAT_ARRAY_TYPE(2);
	out[0] = Math.pow( 2, 31 ) - Math.floor( Math.random() * Math.pow( 2, 32 ) + 1 );
	out[1] = Math.floor( Math.random() * Math.pow( 2, 31 ) + 1 );
	return rat.normalize(out, out);
};

/**
 * Parametric sine: 2a / (1 + a²)
 *
 * @param {rat} out the receiving number
 * @param {rat} a number for which to calculate the parametric sine
 * @returns {rat} out
 */
rat.sin = function(out, a) {
	if (a[1] === 0) return rat.copy(out, RAT_ZERO);
	rat.scalar_multiply(out, a, 2);
	var d = rat.create();
	rat.pow(d, a, 2);
	rat.add(d, d, RAT_ONE);
	rat.divide(out, out, d);
	return out;
};

/**
 * Parametric cosine: (1 - a²) / (1 + a²)
 *
 * @param {rat} out the receiving number
 * @param {rat} a number for which to calculate the parametric cosine
 * @returns {rat} out
 */
rat.cos = function(out, a) {
	if (a[1] === 0) return rat.neg(out, RAT_ONE);
	var a2 = rat.create();
	rat.pow(a2, a, 2);
	rat.sub(out, RAT_ONE, a2);
	var d = rat.create();
	rat.add(d, RAT_ONE, a2);
	rat.divide(out, out, d);
	return out;
};

/**
 * Parametric tangent: sin(a) / cos(a)
 *
 * @param {rat} out the receiving number
 * @param {rat} a number for which to calculate the parametric tangent
 * @returns {rat} out
 */
rat.tan = function(out, a) {
	rat.scalar_multiply(out, a, 2); // out = a * 2
	var t = rat.create();
	rat.pow(t, a, 2); // t = a * a
	rat.scalar_multiply(t, t, 2); // t *= 2
	rat.add(out, out, t); // out += t
	rat.pow(t, a, 4); // t = a * a * a * a
	rat.sub(t, RAT_ONE, t); // t = 1 - t
	rat.divide(out, out, t);
	return out;
};

/**
 * Returns an Egyptian representation
 * The returned string can be evaluated in "calc - arbitrary precision calculator"
 *
 * @param {rat} a number to represent as an Egyptian fraction
 * @returns {String} string representing the most simple sum of fractions having a numerator of one, in "calc" format
 */
rat.toEgyptian = function (a) {
	var t = rat.clone(a);
	rat.abs(t, t);
	var b = rat.floor(t);
	if (b) rat.sub(t, t, rat.fromInteger(b));
	if (!t[0]) return b.toString();
	if (!b) b = '';
	var d = 1;
	var f = rat.create();
	while (t[0] !== 1) {
		d++;
		f = rat.fromValues(1, d);
		if (rat.isGreaterThan(t, f)) {
			if (b) b += ' + ';
			b += rat.str(f);
			rat.sub(t, t, f);
		}
	}
	if (!t) {
		if (!b) return '0';
		return b;
	}
	return b ? b + ' + ' + rat.str(t) : rat.str(t);
};

/**
 * Returns a Babylonian representation (base 60)
 * The returned string can be evaluated in "calc - arbitrary precision calculator"
 *
 * @param {rat} a number to represent as a Babylonian fraction
 * @returns {String} string containing the decimal representations of the base 60 digits and their powers, in "calc" format
 */
rat.toBabylonian = function (a) {
	var s = '';
	 // there must be a better way to do this, avoiding conversion to decimal
	var t = rat.toDecimal(a);
	var n = parseInt(t);
	var r = t - n;
	var d = 0;
	var p = 0;
	while (n > 0) {
		d = n % 60;
		if (d) s = d + ' * 60^' + p + ( s ? ' + ' : '' ) + s;
		n = (n - d) / 60;
		p++;
	}
	p = -1;
	while (r > 0) {
		r *= 60;
		d = parseInt(r + .0000000000001);
		r = r - d;
		if (r < -.0000000000001) continue;
		if (d) s += ( s ? ' + ' : '' ) + d + ' * 60^' + p;
		p--;
	}
	return s ? s : '0';
};

/**
 * Returns a string with the fraction in various formats
 *
 * @param {rat} a number to dump
 * @returns {String} string various conversions
 */
rat.dump = function(r) {
	var t = rat.create();
	return rat.str(r)
	+ '\ntoBabylonian\t ~ '+rat.toBabylonian(r)
	//+ '\ntoEgyptian\t = '+rat.toEgyptian(r)  // can be very slow
	+ '\ndecimal:\t ~ '+rat.toDecimal(r)
	+ '\nsin:\t = '+rat.sin(t, r)
	+ '\ncos:\t = '+rat.cos(t, r)
	+ '\ntan:\t = '+rat.tan(t, r)
	+ '\n';
};

/**
 * Zero, the additive identity
 *
 * @property RAT_ZERO
 * @type RAT_ARRAY_TYPE
 * @static
 * @final
 */
var RAT_ZERO = rat.fromInteger(0);

/**
 * One, the multiplicative identity
 *
 * @property RAT_ONE
 * @type RAT_ARRAY_TYPE
 * @static
 * @final
 */
var RAT_ONE = rat.fromInteger(1);

/**
 * Infinity, represents a non-Zero number divided by Zero
 *
 * @property RAT_INFINITY
 * @type RAT_ARRAY_TYPE
 * @static
 * @final
 */
var RAT_INFINITY = rat.fromValues(1, 0);

/**
 * Infinull, represents Zero divided by Zero
 *
 * @property RAT_INFINULL
 * @type RAT_ARRAY_TYPE
 * @static
 * @final
 */
var RAT_INFINULL = rat.fromValues(0, 0);
