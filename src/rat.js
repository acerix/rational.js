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
 * The type of array to store the numerator and denominator in
 *
 * @property RAT_ARRAY_TYPE
 * @type ArrayObject
 * @static
 * @final
 */
if(!RAT_ARRAY_TYPE) {
	//var RAT_ARRAY_TYPE = typeof Int32Array !== 'undefined' ? Int32Array : Array;
	var RAT_ARRAY_TYPE = Array;
}

/**
 * The inverse of the allowable difference in approximations
 *
 * @property RAT_INFINITESIMAL_PRECISION
 * @type Integer
 * @static
 * @final
 */
if(!RAT_INFINITESIMAL_PRECISION) {
	var RAT_INFINITESIMAL_PRECISION = Math.pow(2, 56);
}

/**
 * Exit (possibly infinite) loops after this many iterations
 *
 * @property RAT_MAX_LOOPS
 * @type Integer
 * @static
 * @final
 */
if(!RAT_MAX_LOOPS) {
	var RAT_MAX_LOOPS = 1024;
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
	var temp = a[0];
	out[0] = a[1];
	out[1] = temp;
	return out;
};

/**
 * Alias for {@link rat.invert}
 * @function
 */
rat.reciprocal = rat.invert;

/**
 * Adds two rats
 *
 * @param {rat} out the receiving number
 * @param {rat} a the first operand
 * @param {rat} b the second operand
 * @returns {rat} out
 */
rat.add = function(out, a, b) {
	if (a[1]===b[1]) {
		out[0] = a[0] + b[0];
		out[1] = a[1];
	}
	else {
		out[0] = a[0] * b[1] + b[0] * a[1];
		out[1] = a[1] * b[1];
	}
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
	if (a[1]===b[1]) {
		out[0] = a[0] - b[0];
		out[1] = a[1];
	}
	else {
		out[0] = a[0] * b[1] - b[0] * a[1];
		out[1] = a[1] * b[1];
	}
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
 * Mediant of two rats
 *
 * @param {rat} out the receiving number
 * @param {rat} a the first operand
 * @param {rat} b the second operand
 * @returns {rat} out the sum of the numerators divided by the sum of the denominators
 */
rat.mediant = function(out, a, b) {
	out[0] = a[0] + b[0];
	out[1] = a[1] + b[1];
	return rat.normalize(out, out);
};

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
	if (a[0] === 0 && b[0] === 0) return true; // both are Zero
	if (a[1] === 0 && b[1] === 0) return true; // both are Infinity
	return a[0] === b[0] && a[1] === b[1];
};

/**
 * Returns true when the first rat is approximately equal to the second
 *
 * @param {rat} a the first operand
 * @param {rat} b the second operand
 * @returns {Bool} true when the difference between the two rats is less than rat.INFINITESIMAL
 */
rat.approximates = function(a, b) {
	if (rat.equals(a, b)) return true;
    var d = rat.create();
    rat.sub(d, a, b);
    rat.abs(d, d);
    return rat.isLessThan(d, rat.INFINITESIMAL);
};

/**
 * Returns true when the first rat is larger than the second
 *
 * @param {rat} a the first operand
 * @param {rat} b the second operand
 * @returns {Bool} true when the first operand is larger
 */
rat.isGreaterThan = function(a, b) {
	if (rat.equals(a, b)) return false;
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
	if (rat.equals(a, b)) return false;
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
	if (isNaN(a[0])||isNaN(a[1])||(a[0]===0&&a[1]===0)) {
		out[0] = 0;
		out[1] = 0;
		return out;
	}
	else if (a[0]===0) {
		out[0] = 0;
		out[1] = 1;
		return out;
	}
	else if (a[1]===0){
		out[0] = 1;
		out[1] = 0;
		return out;
	}
	else if (a[0]===a[1]){
		out[0] = 1;
		out[1] = 1;
		return out;
	}
	else if (a[1] > 0) {
		out[0] = a[0];
		out[1] = a[1];
	}
	else {
		out[0] = -a[0];
		out[1] = -a[1];
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
 * @param {Integer} p power to raise the number by
 * @returns {rat} out
 */
rat.power = function(out, a, p) {
	if (p===2) {
		out[0] = a[0] * a[0];
		out[1] = a[1] * a[1];
	}
	else if (p>0) {
		out[0] = Math.pow(a[0], p);
		out[1] = Math.pow(a[1], p);
	}
	else if (p<0) {
		p = Math.abs(p);
		out[0] = Math.pow(a[1], p);
		out[1] = Math.pow(a[0], p);
	}
	else {
		rat.copy(out, rat.ONE);
	}
	return rat.normalize(out, out);
};

/**
 * Alias for {@link rat.power}
 * @function
 */
rat.pow = rat.power;

/**
 * Find a rational number which approximates the input number when multiplied by itself
 *
 * @param {rat} out the receiving number
 * @param {rat} a the number to find the root of
 * @returns {rat} out
 */
rat.sqrt = function (out, a) {
	return rat.nthRoot(out, a, 2);
};

/**
 * Find a rat approximation which equals the input rat when raised to the given integer exponent
 * 
 * Newton's method converges alot faster... could that be used to find the pattern in the SB tree?
 *
 * @param {rat} out the receiving number
 * @param {rat} a the number to find the root of
 * @param {Integer} n
 * @returns {rat} out
 */
rat.nthRoot = function (out, a, n) {
	if (rat.equals(a, rat.ZERO)) return rat.copy(out, rat.ZERO);
	if (rat.equals(a, rat.ONE)) return rat.copy(out, rat.ONE);
	if (rat.equals(a, rat.INFINITY)) return rat.copy(out, rat.INFINITY);
	if (rat.equals(a, rat.INFINULL)) return rat.copy(out, rat.INFINULL);
	
	var neg = rat.isNegative(a);
	if (neg) a[0] = -a[0];
	
	out = rat.copy(out, rat.ONE);
	var m = [1, 0, 0, 1];
	var test = rat.clone(rat.ONE);
	
	var c = RAT_MAX_LOOPS;
	while ( !rat.approximates(a, test) && c-- ) {
		if (rat.isLessThan(a, test)) {
			m[0] += m[1];
			m[2] += m[3];
		}
		else {
			m[1] += m[0];
			m[3] += m[2];
		}
		out[0] = m[0] + m[1];
		out[1] = m[2] + m[3];
		rat.pow(test, out, n);
	}
	
	if (neg) { 
		a[0] = -a[0];
		if (n%2===1) rat.neg(out, out);
	}
		
	return out;
};

/**
 * Calculates the dot product of two rats
 *
 * @param {rat} a the first operand
 * @param {rat} b the second operand
 * @returns {Integer} dot product of a and b
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
 * Returns a rat from an integer, copying to an existing rat
 *
 * @param {rat} out the receiving number
 * @param {Integer} signed integer
 * @returns {rat} out
 */
rat.fromInteger_copy = function (out, a) {
	out[0] = parseInt(a);
	out[1] = 1;
	return out;
};

/**
 * Returns a rat from an integer, creating a new rat
 *
 * @param {Integer} signed integer
 * @returns {rat} out
 */
rat.fromInteger = function (a) {
	return rat.fromInteger_copy(rat.create(), a);
};

/**
 * Returns a rat from the inverse of an integer, copying to an existing rat
 *
 * @param {rat} out the receiving number
 * @param {Integer} signed integer
 * @returns {rat} out
 */
rat.fromIntegerInverse_copy = function (out, a) {
	out[0] = 1;
	out[1] = parseInt(a);
	return out;
};

/**
 * Returns a rat from the inverse of an integer, creating a new rat
 *
 * @param {Integer} signed integer
 * @returns {rat} out
 */
rat.fromIntegerInverse = function (a) {
	return rat.fromIntegerInverse_copy(rat.create(), a);
};

/**
 * Returns a rat from a decimal number, creating a new rat
 * 
 * @param {Number} a decimal number
 * @returns {rat} out
 */
rat.fromDecimal = function (a) {
	return rat.fromDecimal_copy(rat.create(), a);
};

/**
 * Returns a rat from a decimal number, copying to an existing rat
 *
 * @param {rat} out the receiving number
 * @param {Number} a decimal number
 * @returns {rat} out
 */
rat.fromDecimal_copy = function (out, a) {
	
	a = parseFloat(a);
	if (a===0) return rat.copy(out, rat.ZERO);
	if (a===1) return rat.copy(out, rat.ONE);
	if (a===Infinity) return rat.copy(out, rat.INFINITY);
	if (isNaN(a)) return rat.copy(out, rat.INFINULL);
	if (a%1===0) return rat.fromInteger_copy(out, a);
	if ((1/a)%1===0) return rat.fromIntegerInverse_copy(out, parseInt(1/a));
	
	out[0] = 1;
	out[1] = 1;
	
	var neg = a < 0;
	if (neg) a = Math.abs(a);
	
	var m = [1, 0, 0, 1];
	var test = a;
	
	// traverse the Stern-Brocot tree until a match is found
	// this is comparing the numerator to the denominator multiplied by the target decimal
	var c = RAT_MAX_LOOPS;
	while ( out[0] !== test && c-- ) {
		if (out[0] > test) {
			m[0] += m[1];
			m[2] += m[3];
		}
		else {
			m[1] += m[0];
			m[3] += m[2];
		}
		out[0] = m[0] + m[1];
		out[1] = m[2] + m[3];
		test = a * out[1];
	}
	
	if (neg) rat.neg(out, out);
	return out;
};

/**
 * Creates a new rat from two random integers
 *
 * @param {rat} out the receiving number
 * @returns {rat} a random rational number
 */
rat.fromRandom = function(out) {
	out[0] = 2147483648 - Math.floor( Math.random() * 4294967296 + 1 );
	out[1] = Math.floor( Math.random() * 4294967296 + 1 );
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
	if (a[1] === 0) return rat.copy(out, rat.ZERO);
	rat.scalar_multiply(out, a, 2);
	var d = rat.create();
	rat.pow(d, a, 2);
	rat.add(d, d, rat.ONE);
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
	if (a[1] === 0) return rat.neg(out, rat.ONE);
	var a2 = rat.create();
	rat.pow(a2, a, 2);
	rat.sub(out, rat.ONE, a2);
	var d = rat.create();
	rat.add(d, rat.ONE, a2);
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
	rat.sub(t, rat.ONE, t); // t = 1 - t
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
 * Returns a string of L's and R's representing the Stern Brocot path
 *
 * @param {rat} a number to trace in the Stern Brocot tree
 * @returns {String} Stern Brocot path
 */
rat.traceSternBrocot = function (a) {
	var path = '';
	if (
		rat.equals(a, rat.ZERO)
	||
		rat.equals(a, rat.ONE)
	||
		rat.equals(a, rat.INFINITY)
	||
		rat.equals(a, rat.INFINULL)
		) return path;

	if (rat.equals(a, rat.ZERO)) return rat.copy(out, rat.ZERO);
	if (rat.equals(a, rat.ONE)) return rat.copy(out, rat.ONE);
	if (rat.equals(a, rat.INFINITY)) return rat.copy(out, rat.INFINITY);
	if (rat.equals(a, rat.INFINULL)) return rat.copy(out, rat.INFINULL);
	
	var neg = rat.isNegative(a);
	if (neg) a[0] = -a[0];
	
	var r = rat.clone(rat.ONE);
	var m = [1, 0, 0, 1];
	
	var r_streak = 0;
	var l_streak = 0;
	
	var c = RAT_MAX_LOOPS;
	while ( !rat.equals(a, r) && c-- ) {
		if (rat.isLessThan(a, r)) {
			m[0] += m[1];
			m[2] += m[3];
			l_streak++;
			if (r_streak) {
				path += 'R';
				if (r_streak!==1) path += r_streak;
				r_streak = 0;
				path += ' ';
			}
		}
		else {
			m[1] += m[0];
			m[3] += m[2];
			r_streak++;
			if (l_streak) {
				path += 'L';
				if (l_streak!==1) path += l_streak;
				l_streak = 0;
				path += ' ';
			}
		}
		r[0] = m[0] + m[1];
		r[1] = m[2] + m[3];
	}
	if (l_streak) {
		path += 'L';
		if (l_streak!==1) path += l_streak;
	}
	else if (r_streak) {
		path += 'R';
		if (r_streak!==1) path += r_streak;
	}
	
	if (c<0) path += '...';
	
	if (neg) a[0] = -a[0];
	
	return path;
};

/**
 * Returns a string with the fraction in various formats
 *
 * @param {rat} a number to dump
 * @returns {String} string various conversions
 */
rat.dump = function(r) {
	var t = rat.create();
	return 'rat\t'+rat.str(r)
	+ '\n~\t'+rat.toDecimal(r)
	+ '\nSB:\t'+rat.traceSternBrocot(r)
	//+ '\n'
	//+ '\ntoBabylonian\t ~ '+rat.toBabylonian(r)
	//+ '\ntoEgyptian\t = '+rat.toEgyptian(r)  // can be very slow
	//+ '\nsin:\t ~ '+rat.toDecimal(rat.sin(t, r))
	//+ '\ncos:\t ~ '+rat.toDecimal(rat.cos(t, r))
	//+ '\ntan:\t ~ '+rat.toDecimal(rat.tan(t, r))
	+ '\n';
};

/**
 * Zero, the additive identity
 *
 * @property ZERO
 * @type rat
 * @static
 * @final
 */
rat.ZERO = rat.fromInteger(0);

/**
 * One, the multiplicative identity
 *
 * @property ONE
 * @type rat
 * @static
 * @final
 */
rat.ONE = rat.fromInteger(1);

/**
 * Negative One, Zero minus One
 *
 * @property NEGONE
 * @type rat
 * @static
 * @final
 */
rat.NEGONE = rat.fromInteger(-1);

/**
 * Infinity, a non-Zero number divided by Zero
 *
 * @property INFINITY
 * @type rat
 * @static
 * @final
 */
rat.INFINITY = rat.fromValues(1, 0);

/**
 * Infinull, Zero divided by Zero
 *
 * @property INFINULL
 * @type rat
 * @static
 * @final
 */
rat.INFINULL = rat.fromValues(0, 0);

/**
 * Infinitesimal, the limit for approximations
 *
 * @property INFINITESIMAL
 * @type rat
 * @static
 * @final
 */
rat.INFINITESIMAL = rat.clone([1, RAT_INFINITESIMAL_PRECISION]);

/**
 * Pi, an approximation of the ratio between a circle's circumference and it's diameter
 *
 * @property PI
 * @type rat
 * @static
 * @final
 */
rat.PI = rat.fromValues(
	1320192667429,
	420230377710
);
