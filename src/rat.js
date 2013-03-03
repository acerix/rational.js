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

const RAT_ZERO = new RAT_ARRAY_TYPE([0, 1]);
const RAT_ONE = new RAT_ARRAY_TYPE([1, 1]);

/**
 * @class Rational Number
 * @name rat
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
 * Creates a new rat initialized with the given values
 *
 * @returns {rat} a new rational number
 */
rat.fromRandom = function() {
    var out = new RAT_ARRAY_TYPE(2);
    out[0] = Math.floor( Math.random() * Math.pow( 2, 32 ) + 1 );
    out[1] = Math.floor( Math.random() * Math.pow( 2, 31 ) + 1 );
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
 * Adds two rat's
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
 * Subtracts two rat's
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
 * Multiplies two rat's
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
 * Divides two rat's
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
 * Returns the minimum of two rat's
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
 * Returns the maximum of two rat's
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
 * Scales a rat by an integer
 *
 * @param {rat} out the receiving number
 * @param {rat} a the number to multiply
 * @param {Integer} b amount to multiply the number by
 * @returns {rat} out
 */
rat.scalar_multiply = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1];
    return out;
};


/**
 * Scales a rat by an integer
 *
 * @param {rat} out the receiving number
 * @param {rat} a the number to multiply
 * @param {Integer} b amount to multiply the number by
 * @returns {rat} out
 */
rat.scalar_divide = function(out, a, b) {
    out[0] = a[0];
    out[1] = a[1] * b;
    return out;
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
    
    // denominator is zero
	if (out[1] === 0) return out;
	
    // denominator is negative
	if (out[1] < 0) {
		out[0] *= -1;
		out[1] *= -1;
	}
	
	var gcd = greatest_common_divisor(Math.abs(out[0]), out[1]);
	if (gcd > 1) {
		out[0] /= gcd;
		out[1] /= gcd;
	}
	
    return out;
};

/**
 * Find the greatest common divisor of two integers
 *
 * @param {Integer} a the first operand
 * @param {Integer} b the second operand
 * @returns {Integer} greatest common divisor, or zero on failure
 */
function greatest_common_divisor(a, b) {
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
 * Calculates the dot product of two rat's
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
    return 'rat(' + a[0] + '/' + a[1] + ')';
};

RAT_ARRAY_TYPE.prototype.toString = function() {
	return this[0] + '/' + this[1];
}

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
 * @returns {Float} integer approximation of the number
 */
rat.round = function (a) {
    return Math.round(rat.toDecimal(a));
};

/**
 * Returns the closest integer approximation between the rat and zero
 *
 * @param {rat} a number to round down to the nearest integer
 * @returns {Float} integer approximation of the number
 */
rat.floor = function (a) {
    return
		rat.isNegative(a)
		? Math.floor(rat.toDecimal(a))
		: 0 - Math.floor(Math.abs(rat.toDecimal(a)));
};

/**
 * Returns a rat from an integer
 *
 * @param {rat} out the receiving number
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
 * Returns a rat from a decimal
 *
 * @param {rat} out the receiving number
 * @param {Number} signed decimal number
 * @returns {rat} out
 */
rat.fromDecimal = function (a) {
	if (a % 1 === 0) return rat.fromInteger(a);
    var out = new RAT_ARRAY_TYPE(2);
	out[1] = Math.pow(10, a.toString().split('.')[1].length);
	out[0] = parseInt(a * out[1]);
    return rat.normalize(out, out);
};


/**
 * Parametric sine, given by: 2 * a / (a * a + 1)
 *
 * @param {rat} out the receiving number
 * @param {rat} a number for which to calculate the parametric sine
 * @returns {rat} out
 */
rat.sin = function(out, a) {
    rat.scalar_multiply(out, a, 2);
    var d = rat.create();
    rat.pow(d, a, 2);
    rat.add(d, d, RAT_ONE);
    rat.divide(out, out, d);
    return out;
};

/**
 * Parametric cosine, given by: (a * a - 1) / (a * a + 1)
 *
 * @param {rat} out the receiving number
 * @param {rat} a number for which to calculate the parametric cosine
 * @returns {rat} out
 */
rat.cos = function(out, a) {
    var a2 = rat.create();
    rat.pow(a2, a, 2);
    rat.sub(out, RAT_ONE, a2);
    var d = rat.create();
    rat.add(d, RAT_ONE, a2);
    rat.divide(out, out, d);
    return out;
};

/**
 * Parametric tangent, given by: sin / cos
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
 *
 * @param {rat} a number to represent as an Egyptian fraction
 * @returns {String} string representing the most simple sum of fractions having a numerator of one
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
			b += f.toString();
			rat.sub(t, t, f);
		}
	}
	if (!t) {
		if (!b) return '0';
		return b;
	}
	return b ? b + ' + ' + t : t.toString();
};

/**
 * Returns a Babylonian representation (base 60)
 *
 * @param {rat} a number to represent as a Babylonian fraction
 * @returns {String} string containing the decimal representations of the base 60 digits and their powers
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

rat.dump = function(r) {
	var t = rat.create();
	return rat.str(r)
	//+ '\ntoEgyptian\t = '+rat.toEgyptian(r)
	+ '\ntoBabylonian\t ~ '+rat.toBabylonian(r)
	+ '\ndec\t ~ '+rat.dec(r)
	+ '\nround\t ~ '+rat.round(r)
	+ '\nsin\t = '+rat.sin(t, r)
	+ '\ncos\t = '+rat.cos(t, r)
	+ '\ntan\t = '+rat.tan(t, r)
	+ '\n';
};
