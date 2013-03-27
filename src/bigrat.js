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
 * The inverse of the allowable difference in approximations
 *
 * @property RAT_INFINITESIMAL_PRECISION
 * @type Integer
 * @static
 * @final
 */
if(!BIGRAT_INFINITESIMAL_PRECISION) {
	var BIGRAT_INFINITESIMAL_PRECISION = new BigInteger('0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF');
}

/**
 * @class Arbitrary Sized Rational Number
 * @name bigrat
 * @requires bigint BigInteger
 */
var bigrat = {};

/**
 * Creates a new, empty bigrat
 *
 * @returns {bigrat} a new bigrational number
 */
bigrat.create = function() {
	var out = [];
	out[0] = BigInteger.ZERO;
	out[1] = BigInteger.ONE;
	return out;
};

/**
 * Creates a new bigrat initialized with values from an existing number
 *
 * @param {bigrat} a number to clone
 * @returns {bigrat} a new bigrational number
 */
bigrat.clone = function(a) {
	var out = [];
	out[0] = a[0];
	out[1] = a[1];
	return out;
};

/**
 * Creates a new bigrat initialized with the given values
 *
 * @param {Number} n Numerator
 * @param {Number} d Denominator
 * @returns {bigrat} a new bigrational number
 */
bigrat.fromValues = function(n, d) {
	var out = [];
	out[0] = new BigInteger(n);
	out[1] = new BigInteger(d);
	return bigrat.normalize(out, out);
};

/**
 * Copy the values from one bigrat to another
 *
 * @param {bigrat} out the receiving number
 * @param {bigrat} a the source number
 * @returns {bigrat} out
 */
bigrat.copy = function(out, a) {
	out[0] = a[0];
	out[1] = a[1];
	return out;
};

/**
 * Set the components of a bigrat to the given values
 *
 * @param {bigrat} out the receiving number
 * @param {BigInteger} n Numerator
 * @param {BigInteger} d Denominator
 * @returns {bigrat} out
 */
bigrat.set = function(out, n, d) {
	out[0] = n;
	out[1] = d;
	return bigrat.normalize(out, out);
};

/**
 * Absolute value of a bigrat
 *
 * @param {bigrat} out the receiving number
 * @param {bigrat} a number to take the absolute value of
 * @returns {bigrat} out
 */
bigrat.abs = function(out, a) {
	out[0] = a[0].abs();
	out[1] = a[1];
	return out;
};

/**
 * Inverts a bigrat
 *
 * @param {bigrat} out the receiving number
 * @param {bigrat} a number to invert
 * @returns {bigrat} out
 */
bigrat.invert = function(out, a) {
	var temp = a[0];
	out[0] = a[1];
	out[1] = temp;
	return out;
};

/**
 * Alias for {@link bigrat.invert}
 * @function
 */
bigrat.reciprocal = bigrat.invert;

/**
 * Adds two bigrats
 *
 * @param {bigrat} out the receiving number
 * @param {bigrat} a the first operand
 * @param {bigrat} b the second operand
 * @returns {bigrat} out
 */
bigrat.add = function(out, a, b) {
	if (a[1].compare(b[1])===0) {
		out[0] = a[0].add(b[0]);
		out[1] = a[1];
	}
	else {
		out[0] = a[0].multiply(b[1]).add( b[0].multiply(a[1]) );
		out[1] = a[1].multiply(b[1]);
	}
	return bigrat.normalize(out, out);
};

/**
 * Subtracts two bigrats
 *
 * @param {bigrat} out the receiving number
 * @param {bigrat} a the first operand
 * @param {bigrat} b the second operand
 * @returns {bigrat} out
 */
bigrat.subtract = function(out, a, b) {
	if (a[1].compare(b[1])===0) {
		out[0] = a[0].subtract(b[0]);
		out[1] = a[1];
	}
	else {
		out[0] = a[0].multiply(b[1]).subtract( b[0].multiply(a[1]) );
		out[1] = a[1].multiply(b[1]);
	}
	return bigrat.normalize(out, out);
};

/**
 * Alias for {@link bigrat.subtract}
 * @function
 */
bigrat.sub = bigrat.subtract;

/**
 * Multiplies two bigrats
 *
 * @param {bigrat} out the receiving number
 * @param {bigrat} a the first operand
 * @param {bigrat} b the second operand
 * @returns {bigrat} out
 */
bigrat.multiply = function(out, a, b) {
	out[0] = a[0].multiply(b[0]);
	out[1] = a[1].multiply(b[1]);
	return bigrat.normalize(out, out);
};

/**
 * Alias for {@link bigrat.multiply}
 * @function
 */
bigrat.mul = bigrat.multiply;

/**
 * Mediant of two bigrats
 *
 * @param {bigrat} out the receiving number
 * @param {bigrat} a the first operand
 * @param {bigrat} b the second operand
 * @returns {bigrat} out the sum of the numebigrators divided by the sum of the denominators
 */
bigrat.mediant = function(out, a, b) {
	out[0] = a[0].add(b[0]);
	out[1] = a[1].add(b[1]);
	return bigrat.normalize(out, out);
};

/**
 * Divides two bigrats
 *
 * @param {bigrat} out the receiving number
 * @param {bigrat} a the first operand
 * @param {bigrat} b the second operand
 * @returns {bigrat} out
 */
bigrat.divide = function(out, a, b) {
	out[0] = a[0].multiply(b[1]);
	out[1] = a[1].multiply(b[0]); 
	return bigrat.normalize(out, out);
};

/**
 * Alias for {@link bigrat.divide}
 * @function
 */
bigrat.div = bigrat.divide;

/**
 * Returns true when the first bigrat is equal to the second
 *
 * @param {bigrat} a the first operand
 * @param {bigrat} b the second operand
 * @returns {Bool} true when the two bigrats are equal
 */
bigrat.equals = function(a, b) {
	if (a[0].isZero() && b[0].isZero()) return true; // both are Zero
	if (a[1].isZero() && b[1].isZero()) return true; // both are Infinity
	return (a[0].compare(b[0])===0) && (a[1].compare(b[1])===0);
};

/**
 * Returns true when the first bigrat is approximately equal to the second
 *
 * @param {bigrat} a the first operand
 * @param {bigrat} b the second operand
 * @returns {Bool} true when the difference between the two bigrats is less than bigrat.INFINITESIMAL
 */
bigrat.approximates = function(a, b) {
	if (bigrat.equals(a, b)) return true;
    var d = bigrat.create();
    bigrat.sub(d, a, b);
    bigrat.abs(d, d);
    return bigrat.isLessThan(d, bigrat.INFINITESIMAL);
};

/**
 * Returns true when the first bigrat is larger than the second
 *
 * @param {bigrat} a the first operand
 * @param {bigrat} b the second operand
 * @returns {Bool} true when the first operand is larger
 */
bigrat.isGreaterThan = function(a, b) {
	if (bigrat.equals(a, b)) return false;
	return a[0].multiply(b[1]).compare( b[0].multiply(a[1]) ) > 0;
};

/**
 * Returns true when the first bigrat is smaller than the second
 *
 * @param {bigrat} a the first operand
 * @param {bigrat} b the second operand
 * @returns {Bool} true when the first operand is smaller
 */
bigrat.isLessThan = function(a, b) {
	if (bigrat.equals(a, b)) return false;
	return a[0].multiply(b[1]).compare( b[0].multiply(a[1]) ) < 0;
};

/**
 * Returns true when the bigrat is negative
 *
 * @param {bigrat} a the number to check
 * @returns {Bool} true when the number is less than zero
 */
bigrat.isNegative = function(a) {
	return a[0].isNegative();
};

/**
 * Returns the minimum of two bigrats
 *
 * @param {bigrat} out the receiving number
 * @param {bigrat} a the first operand
 * @param {bigrat} b the second operand
 * @returns {bigrat} out
 */
bigrat.min = function(out, a, b) {
	if (bigrat.isLessThan(a, b)) {
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
 * Returns the maximum of two bigrats
 *
 * @param {bigrat} out the receiving number
 * @param {bigrat} a the first operand
 * @param {bigrat} b the second operand
 * @returns {bigrat} out
 */
bigrat.max = function(out, a, b) {
	if (bigrat.isGreaterThan(a, b)) {
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
 * Multiplies a bigrat's numebigrator by an integer
 *
 * @param {bigrat} out the receiving number
 * @param {bigrat} a the number to multiply
 * @param {Integer} b amount to multiply the number by
 * @returns {bigrat} out
 */
bigrat.scalar_multiply = function(out, a, b) {
	out[0] = a[0].multiply(b);
	out[1] = a[1];
	return bigrat.normalize(out, out);
};


/**
 * Multiplies a bigrat's denominator by an integer
 *
 * @param {bigrat} out the receiving number
 * @param {bigrat} a the number to divide
 * @param {Integer} b amount to divide by
 * @returns {bigrat} out
 */
bigrat.scalar_divide = function(out, a, b) {
	out[0] = a[0];
	out[1] = a[1].multiply(b);
	return bigrat.normalize(out, out);
};

/**
 * Normalize a bigrat
 *
 * @param {bigrat} out the receiving number
 * @param {bigrat} a number to normalize
 * @returns {bigrat} out
 */
bigrat.normalize = function(out, a) {
	//if (isNaN(a[0])||isNaN(a[1])) return out = bigrat.clone(bigrat.INFINULL);
	if (a[0].isZero()||a[1].isZero()) return out = a;
	if (a[0].compare(a[1])===0) return out = bigrat.clone(bigrat.ONE);
	if (!a[1].isNegative()) {
		out[0] = a[0];
		out[1] = a[1];
		if (out[1].isZero()) return out
	}
	else {
		out[0] = a[0].negate();
		out[1] = a[1].negate();
	}
	var gcd = bigint.greatest_common_divisor(out[0].abs(), out[1]);
	if (gcd.compare(BigInteger.ONE)>0) {
		out[0] = out[0].quotient(gcd);
		out[1] = out[1].quotient(gcd);
	}
	return out;
};

/**
 * Negates a bigrat
 *
 * @param {bigrat} out the receiving number
 * @param {bigrat} a number to negate
 * @returns {bigrat} out
 */
bigrat.opposite = function(out, a) {
	out[0] = a[0].negate();
	out[1] = a[1];
	return out;
};

/**
 * Alias for {@link bigrat.opposite}
 * @function
 */
bigrat.neg = bigrat.negative = bigrat.opposite;

/**
 * Raises a bigrat to an integer exponent
 *
 * @param {bigrat} out the receiving number
 * @param {bigrat} a the number to exponentiate
 * @param {Integer} p power to raise the number by
 * @returns {bigrat} out
 */
bigrat.power = function(out, a, p) {
	if (p===2) {
		out[0] = a[0].square();
		out[1] = a[1].square();
	}
	else if (p>0) {
		out[0] = a[0].pow(p);
		out[1] = a[1].pow(p);
	}
	else if (p<0) {
		p = p.abs();
		out[0] = a[1].pow(p);
		out[1] = a[0].pow(p);
	}
	else {
		bigrat.copy(out, bigrat.ONE);
	}
	return out;
};

/**
 * Alias for {@link bigrat.power}
 * @function
 */
bigrat.pow = bigrat.power;

/**
 * Find a bigrational number which approximates the input number when multiplied by itself
 *
 * @param {bigrat} out the receiving number
 * @param {bigrat} a the number to find the root of
 * @returns {bigrat} out
 */
bigrat.sqrt = function (out, a) {
	return bigrat.nthRoot(out, a, 2);
};

/**
 * Find a bigrat approximation which equals the input bigrat when raised to the given integer exponent
 * 
 * Newton's method converges alot faster... could that be used to find the pattern in the SB tree?
 *
 * @param {bigrat} out the receiving number
 * @param {bigrat} a the number to find the root of
 * @param {Integer} n
 * @returns {bigrat} out
 */
bigrat.nthRoot = function (out, a, n) {
	if (bigrat.equals(a, bigrat.ZERO)) return bigrat.copy(out, bigrat.ZERO);
	if (bigrat.equals(a, bigrat.ONE)) return bigrat.copy(out, bigrat.ONE);
	if (bigrat.equals(a, bigrat.INFINITY)) return bigrat.copy(out, bigrat.INFINITY);
	if (bigrat.equals(a, bigrat.INFINULL)) return bigrat.copy(out, bigrat.INFINULL);
	
	var neg = bigrat.isNegative(a);
	if (neg) a[0] = a[0].negate();
	
	bigrat.copy(out, bigrat.ONE);
	var m = [
		BigInteger(1),
		BigInteger(0),
		BigInteger(0),
		BigInteger(1)
	];
	var test = bigrat.clone(bigrat.ONE);
	
	var c = RAT_MAX_LOOPS;
	while ( !bigrat.approximates(a, test) && c-- ) {
		if (bigrat.isLessThan(a, test)) {
			m[0] = m[0].add(m[1]);
			m[2] = m[2].add(m[3]);
		}
		else {
			m[1] = m[1].add(m[0]);
			m[3] = m[3].add(m[2]);
		}
		out[0] = m[0].add(m[1]);
		out[1] = m[2].add(m[3]);
		bigrat.pow(test, out, n);
	}
	
	if (neg) { 
		a[0] = a[0].negate();
		if (n%2===1) bigrat.neg(out, out);
	}
	
	return out;
};

/**
 * Calculates the dot product of two bigrats
 *
 * @param {bigrat} a the first operand
 * @param {bigrat} b the second operand
 * @returns {Integer} dot product of a and b
 */
bigrat.dot = function (a, b) {
	return a[0].multiply(b[0]).add( a[1].multiply(b[1]) );
};

/**
 * Returns a string representation
 *
 * @param {bigrat} a number to represent as a string
 * @returns {String} string representation of the number
 */
bigrat.str = function (a) {
	return a[1].compare(BigInteger.ONE)===0 ? a[0].toString() : a[0].toString() + '/' + a[1].toString();
};

/**
 * Returns a decimal approximation
 *
 * @param {bigrat} a number to approximate as a decimal
 * @returns {Float} decimal approximation of the number
 */
bigrat.toDecimal = function (a) {
	return a[0].toJSValue() / a[1].toJSValue();
};

/**
 * Alias for {@link bigrat.toDecimal}
 * @function
 */
bigrat.dec = bigrat.toDecimal;

/**
 * Returns a big integer approximation (truncated towards zero)
 *
 * @param {bigrat} a number to round
 * @returns {Integer} native integer approximation of the number
 */
bigrat.toInteger = function (a) {
	return a[0].quotient(a[1]).toJSValue();
};

/**
 * Alias for {@link bigrat.toInteger}
 * @function
 */
bigrat.round = bigrat.toInteger;

/**
 * Returns a big integer approximation (truncated towards zero)
 *
 * @param {bigrat} a number to round
 * @returns {BigInteger} big integer approximation of the number
 */
bigrat.toBigInteger = function (a) {
	return a[0].quotient(a[1]);
};

/**
 * Returns the closest integer approximation by rounding down
 *
 * @param {bigrat} a number to round down to the nearest integer
 * @returns {Integer} integer approximation of the number
 */
bigrat.floor = function (a) {
	return Math.floor(bigrat.toDecimal(a));
};

/**
 * Returns the closest integer approximation by rounding up
 *
 * @param {bigrat} a number to round up to the nearest integer
 * @returns {Integer} integer approximation of the number
 */
bigrat.ceil = function (a) {
	return Math.ceil(bigrat.toDecimal(a));
};

/**
 * Returns a bigrat from an integer, copying to an existing bigrat
 *
 * @param {bigrat} out the receiving number
 * @param {Integer} signed integer
 * @returns {bigrat} out
 */
bigrat.fromInteger_copy = function (out, a) {
	out[0] = BigInteger(parseInt(a));
	out[1] = BigInteger.ONE;
	return out;
};

/**
 * Returns a bigrat from an integer, creating a new bigrat
 *
 * @param {Integer} signed integer
 * @returns {bigrat} out
 */
bigrat.fromInteger = function (a) {
	return bigrat.fromInteger_copy(bigrat.create(), a);
};

/**
 * Returns a bigrat from the inverse of an integer, copying to an existing bigrat
 *
 * @param {bigrat} out the receiving number
 * @param {Integer} signed integer
 * @returns {bigrat} out
 */
bigrat.fromIntegerInverse_copy = function (out, a) {
	out[0] = BigInteger.ONE;
	out[1] = BigInteger(parseInt(a));
	return out;
};

/**
 * Returns a bigrat from the inverse of an integer, creating a new bigrat
 *
 * @param {Integer} signed integer
 * @returns {bigrat} out
 */
bigrat.fromIntegerInverse = function (a) {
	return bigrat.fromIntegerInverse_copy(bigrat.create(), a);
};

/**
 * Returns a bigrat from a decimal number, creating a new bigrat
 * 
 * @param {Number} a decimal number
 * @returns {bigrat} out
 */
bigrat.fromDecimal = function (a) {
	return bigrat.fromDecimal_copy(bigrat.create(), a);
};

/**
 * Returns a bigrat from a decimal number
 *
 * @param {bigrat} out the receiving number
 * @param {Number} a decimal number
 * @returns {bigrat} out
 */
bigrat.fromDecimal_copy = function (out, a) {
	
	a = parseFloat(a);
	if (a===0) return bigrat.copy(out, bigrat.ZERO);
	if (a===1) return bigrat.copy(out, bigrat.ONE);
	if (a===Infinity) return bigrat.copy(out, bigrat.INFINITY);
	if (isNaN(a)) return bigrat.copy(out, bigrat.INFINULL);
	if (a%1===0) return bigrat.fromInteger_copy(out, a);
	if ((1/a)%1===0) return bigrat.fromIntegerInverse_copy(out, parseInt(1/a));
	
	bigrat.copy(out, bigrat.ONE);
	
	var m = [
		BigInteger(1),
		BigInteger(0),
		BigInteger(0),
		BigInteger(1)
	];
	var test = a;

	// traverse the Stern-Brocot tree until a match is found
	// this is comparing the numerator to the denominator multiplied by the target decimal
	var c = RAT_MAX_LOOPS;
	while ( out[0].valueOf() !== test && c-- ) {
		if (out[0].valueOf() > test) {
			m[0] = m[0].add(m[1]);
			m[2] = m[2].add(m[3]);
		}
		else {
			m[1] = m[1].add(m[0]);
			m[3] = m[3].add(m[2]);
		}
		out[0] = m[0].add(m[1]);
		out[1] = m[2].add(m[3]);
		test = out[1].valueOf() * a;
	}
	return out;
};

/**
 * Creates a new bigrat from two random integers
 *
 * @param {bigrat} out the receiving number
 * @returns {bigrat} a random bigrational number
 */
bigrat.fromRandom = function(out) {
	out[0] = BigInteger(2147483648 - Math.floor( Math.random() * 4294967296 + 1 ));
	out[1] = BigInteger(Math.floor( Math.random() * 4294967296 + 1 ));
	return bigrat.normalize(out, out);
};

/**
 * Parametric sine: 2a / (1 + a²)
 *
 * @param {bigrat} out the receiving number
 * @param {bigrat} a number for which to calculate the parametric sine
 * @returns {bigrat} out
 */
bigrat.sin = function(out, a) {
	if (a[1].isZero()) return bigrat.copy(out, bigrat.ZERO);
	bigrat.scalar_multiply(out, a, 2);
	var d = bigrat.create();
	bigrat.pow(d, a, 2);
	bigrat.add(d, d, bigrat.ONE);
	bigrat.divide(out, out, d);
	return out;
};

/**
 * Parametric cosine: (1 - a²) / (1 + a²)
 *
 * @param {bigrat} out the receiving number
 * @param {bigrat} a number for which to calculate the parametric cosine
 * @returns {bigrat} out
 */
bigrat.cos = function(out, a) {
	if (a[1].isZero()) return bigrat.neg(out, bigrat.ONE);
	var a2 = bigrat.create();
	bigrat.pow(a2, a, 2);
	bigrat.sub(out, bigrat.ONE, a2);
	var d = bigrat.create();
	bigrat.add(d, bigrat.ONE, a2);
	bigrat.divide(out, out, d);
	return out;
};

/**
 * Parametric tangent: sin(a) / cos(a)
 *
 * @param {bigrat} out the receiving number
 * @param {bigrat} a number for which to calculate the parametric tangent
 * @returns {bigrat} out
 */
bigrat.tan = function(out, a) {
	bigrat.scalar_multiply(out, a, 2); // out = a * 2
	var t = bigrat.create();
	bigrat.pow(t, a, 2); // t = a * a
	bigrat.scalar_multiply(t, t, 2); // t *= 2
	bigrat.add(out, out, t); // out += t
	bigrat.pow(t, a, 4); // t = a * a * a * a
	bigrat.sub(t, bigrat.ONE, t); // t = 1 - t
	bigrat.divide(out, out, t);
	return out;
};

/**
 * Returns an Egyptian representation
 * The returned string can be evaluated in "calc - arbitrary precision calculator"
 *
 * @param {bigrat} a number to represent as an Egyptian fraction
 * @returns {String} string representing the most simple sum of fractions having a numebigrator of one, in "calc" format
 */
bigrat.toEgyptian = function (a) {
	var t = bigrat.clone(a);
	bigrat.abs(t, t);
	var b = bigrat.floor(t);
	if (b) bigrat.sub(t, t, bigrat.fromInteger(b));
	if (!t[0]) return b.toString();
	if (!b) b = '';
	var d = 1;
	var f = bigrat.create();
	while (t[0] !== 1) {
		d++;
		f = bigrat.fromValues(1, d);
		if (bigrat.isGreaterThan(t, f)) {
			if (b) b += ' + ';
			b += bigrat.str(f);
			bigrat.sub(t, t, f);
		}
	}
	if (!t) {
		if (!b) return '0';
		return b;
	}
	return b ? b + ' + ' + bigrat.str(t) : bigrat.str(t);
};

/**
 * Returns a Babylonian representation (base 60)
 * The returned string can be evaluated in "calc - arbitrary precision calculator"
 *
 * @param {bigrat} a number to represent as a Babylonian fraction
 * @returns {String} string containing the decimal representations of the base 60 digits and their powers, in "calc" format
 */
bigrat.toBabylonian = function (a) {
	var s = '';
	 // there must be a better way to do this, avoiding conversion to decimal
	var t = bigrat.toDecimal(a);
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
 * @param {bigrat} a number to trace in the Stern Brocot tree
 * @returns {String} Stern Brocot path
 */
bigrat.traceSternBrocot = function (a) {
	var path = '';
	if (
		bigrat.equals(a, bigrat.ZERO)
	||
		bigrat.equals(a, bigrat.ONE)
	||
		bigrat.equals(a, bigrat.INFINITY)
	||
		bigrat.equals(a, bigrat.INFINULL)
		) return path;

	if (bigrat.equals(a, bigrat.ZERO)) return bigrat.copy(out, bigrat.ZERO);
	if (bigrat.equals(a, bigrat.ONE)) return bigrat.copy(out, bigrat.ONE);
	if (bigrat.equals(a, bigrat.INFINITY)) return bigrat.copy(out, bigrat.INFINITY);
	if (bigrat.equals(a, bigrat.INFINULL)) return bigrat.copy(out, bigrat.INFINULL);

	var neg = bigrat.isNegative(a);
	if (neg) a[0] = a[0].negate();
	
	var r = bigrat.clone(bigrat.ONE);
	
	var m = [
		BigInteger(1),
		BigInteger(0),
		BigInteger(0),
		BigInteger(1)
	];
	
	var r_streak = 0;
	var l_streak = 0;
	
	var c = RAT_MAX_LOOPS;
	while ( !bigrat.equals(a, r) && c-- ) {
		if (bigrat.isLessThan(a, r)) {
			m[0] = m[0].add(m[1]);
			m[2] = m[2].add(m[3]);
			l_streak++;
			if (r_streak) {
				path += 'R';
				if (r_streak!==1) path += r_streak;
				r_streak = 0;
				path += ' ';
			}
		}
		else {
			m[1] = m[1].add(m[0]);
			m[3] = m[3].add(m[2]);
			r_streak++;
			if (l_streak) {
				path += 'L';
				if (l_streak!==1) path += l_streak;
				l_streak = 0;
				path += ' ';
			}
		}
		r[0] = m[0].add(m[1]);
		r[1] = m[2].add(m[3]);
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
	
	if (neg) a[0] = a[0].negate();
	
	return path;
};

/**
 * Returns a string with the fraction in various formats
 *
 * @param {bigrat} a number to dump
 * @returns {String} string various conversions
 */
bigrat.dump = function(r) {
	var t = bigrat.create();
	return 'bigrat\t'+bigrat.str(r)
	+ '\n~\t'+bigrat.toDecimal(r)
	+ '\nSB:\t'+bigrat.traceSternBrocot(r)
	//+ '\n'
	//+ '\ntoBabylonian\t ~ '+bigrat.toBabylonian(r)
	//+ '\ntoEgyptian\t = '+bigrat.toEgyptian(r)  // can be very slow
	//+ '\nsin:\t ~ '+bigrat.toDecimal(bigrat.sin(t, r))
	//+ '\ncos:\t ~ '+bigrat.toDecimal(bigrat.cos(t, r))
	//+ '\ntan:\t ~ '+bigrat.toDecimal(bigrat.tan(t, r))
	+ '\n';
};

/**
 * Zero, the additive identity
 *
 * @property ZERO
 * @type bigrat
 * @static
 * @final
 */
bigrat.ZERO = bigrat.fromInteger(0);

/**
 * One, the multiplicative identity
 *
 * @property ONE
 * @type bigrat
 * @static
 * @final
 */
bigrat.ONE = bigrat.fromInteger(1);

/**
 * Negative One, Zero minus One
 *
 * @property NEGONE
 * @type bigrat
 * @static
 * @final
 */
bigrat.NEGONE = bigrat.fromInteger(-1);

/**
 * Infinity, a non-Zero number divided by Zero
 *
 * @property INFINITY
 * @type bigrat
 * @static
 * @final
 */
bigrat.INFINITY = bigrat.fromValues(1, 0);

/**
 * Infinull, Zero divided by Zero
 *
 * @property INFINULL
 * @type bigrat
 * @static
 * @final
 */
bigrat.INFINULL = bigrat.fromValues(0, 0);

/**
 * Infinitesimal, the limit for approximations
 *
 * @property INFINITESIMAL
 * @type bigrat
 * @static
 * @final
 */
bigrat.INFINITESIMAL = bigrat.clone([new BigInteger(1), BIGRAT_INFINITESIMAL_PRECISION]);

/**
 * Pi, an approximation of the ratio between a circle's circumference and it's diameter
 *
 * @property PI
 * @type bigrat
 * @static
 * @final
 */
bigrat.PI = bigrat.fromValues(
	'3141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909145648566923460348610454326648213393607260249141273724587',
	'1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
);
