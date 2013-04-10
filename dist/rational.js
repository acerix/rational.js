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
/*
	JavaScript BigInteger library version 0.9
	http://silentmatt.com/biginteger/

	Copyright (c) 2009 Matthew Crumley <email@matthewcrumley.com>
	Copyright (c) 2010,2011 by John Tobey <John.Tobey@gmail.com>
	Licensed under the MIT license.

	Support for arbitrary internal representation base was added by
	Vitaly Magerya.
*/

/*
	File: biginteger.js

	Exports:

		<BigInteger>
*/
(function(exports) {
"use strict";
/*
	Class: BigInteger
	An arbitrarily-large integer.

	<BigInteger> objects should be considered immutable. None of the "built-in"
	methods modify *this* or their arguments. All properties should be
	considered private.

	All the methods of <BigInteger> instances can be called "statically". The
	static versions are convenient if you don't already have a <BigInteger>
	object.

	As an example, these calls are equivalent.

	> BigInteger(4).multiply(5); // returns BigInteger(20);
	> BigInteger.multiply(4, 5); // returns BigInteger(20);

	> var a = 42;
	> var a = BigInteger.toJSValue("0b101010"); // Not completely useless...
*/

var CONSTRUCT = {}; // Unique token to call "private" version of constructor

/*
	Constructor: BigInteger()
	Convert a value to a <BigInteger>.

	Although <BigInteger()> is the constructor for <BigInteger> objects, it is
	best not to call it as a constructor. If *n* is a <BigInteger> object, it is
	simply returned as-is. Otherwise, <BigInteger()> is equivalent to <parse>
	without a radix argument.

	> var n0 = BigInteger();      // Same as <BigInteger.ZERO>
	> var n1 = BigInteger("123"); // Create a new <BigInteger> with value 123
	> var n2 = BigInteger(123);   // Create a new <BigInteger> with value 123
	> var n3 = BigInteger(n2);    // Return n2, unchanged

	The constructor form only takes an array and a sign. *n* must be an
	array of numbers in little-endian order, where each digit is between 0
	and BigInteger.base.  The second parameter sets the sign: -1 for
	negative, +1 for positive, or 0 for zero. The array is *not copied and
	may be modified*. If the array contains only zeros, the sign parameter
	is ignored and is forced to zero.

	> new BigInteger([5], -1): create a new BigInteger with value -5

	Parameters:

		n - Value to convert to a <BigInteger>.

	Returns:

		A <BigInteger> value.

	See Also:

		<parse>, <BigInteger>
*/
function BigInteger(n, s, token) {
	if (token !== CONSTRUCT) {
		if (n instanceof BigInteger) {
			return n;
		}
		else if (typeof n === "undefined") {
			return ZERO;
		}
		return BigInteger.parse(n);
	}

	n = n || [];  // Provide the nullary constructor for subclasses.
	while (n.length && !n[n.length - 1]) {
		--n.length;
	}
	this._d = n;
	this._s = n.length ? (s || 1) : 0;
}

BigInteger._construct = function(n, s) {
	return new BigInteger(n, s, CONSTRUCT);
};

// Base-10 speedup hacks in parse, toString, exp10 and log functions
// require base to be a power of 10. 10^7 is the largest such power
// that won't cause a precision loss when digits are multiplied.
var BigInteger_base = 10000000;
var BigInteger_base_log10 = 7;

BigInteger.base = BigInteger_base;
BigInteger.base_log10 = BigInteger_base_log10;

var ZERO = new BigInteger([], 0, CONSTRUCT);
// Constant: ZERO
// <BigInteger> 0.
BigInteger.ZERO = ZERO;

var ONE = new BigInteger([1], 1, CONSTRUCT);
// Constant: ONE
// <BigInteger> 1.
BigInteger.ONE = ONE;

var M_ONE = new BigInteger(ONE._d, -1, CONSTRUCT);
// Constant: M_ONE
// <BigInteger> -1.
BigInteger.M_ONE = M_ONE;

// Constant: _0
// Shortcut for <ZERO>.
BigInteger._0 = ZERO;

// Constant: _1
// Shortcut for <ONE>.
BigInteger._1 = ONE;

/*
	Constant: small
	Array of <BigIntegers> from 0 to 36.

	These are used internally for parsing, but useful when you need a "small"
	<BigInteger>.

	See Also:

		<ZERO>, <ONE>, <_0>, <_1>
*/
BigInteger.small = [
	ZERO,
	ONE,
	/* Assuming BigInteger_base > 36 */
	new BigInteger( [2], 1, CONSTRUCT),
	new BigInteger( [3], 1, CONSTRUCT),
	new BigInteger( [4], 1, CONSTRUCT),
	new BigInteger( [5], 1, CONSTRUCT),
	new BigInteger( [6], 1, CONSTRUCT),
	new BigInteger( [7], 1, CONSTRUCT),
	new BigInteger( [8], 1, CONSTRUCT),
	new BigInteger( [9], 1, CONSTRUCT),
	new BigInteger([10], 1, CONSTRUCT),
	new BigInteger([11], 1, CONSTRUCT),
	new BigInteger([12], 1, CONSTRUCT),
	new BigInteger([13], 1, CONSTRUCT),
	new BigInteger([14], 1, CONSTRUCT),
	new BigInteger([15], 1, CONSTRUCT),
	new BigInteger([16], 1, CONSTRUCT),
	new BigInteger([17], 1, CONSTRUCT),
	new BigInteger([18], 1, CONSTRUCT),
	new BigInteger([19], 1, CONSTRUCT),
	new BigInteger([20], 1, CONSTRUCT),
	new BigInteger([21], 1, CONSTRUCT),
	new BigInteger([22], 1, CONSTRUCT),
	new BigInteger([23], 1, CONSTRUCT),
	new BigInteger([24], 1, CONSTRUCT),
	new BigInteger([25], 1, CONSTRUCT),
	new BigInteger([26], 1, CONSTRUCT),
	new BigInteger([27], 1, CONSTRUCT),
	new BigInteger([28], 1, CONSTRUCT),
	new BigInteger([29], 1, CONSTRUCT),
	new BigInteger([30], 1, CONSTRUCT),
	new BigInteger([31], 1, CONSTRUCT),
	new BigInteger([32], 1, CONSTRUCT),
	new BigInteger([33], 1, CONSTRUCT),
	new BigInteger([34], 1, CONSTRUCT),
	new BigInteger([35], 1, CONSTRUCT),
	new BigInteger([36], 1, CONSTRUCT)
];

// Used for parsing/radix conversion
BigInteger.digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

/*
	Method: toString
	Convert a <BigInteger> to a string.

	When *base* is greater than 10, letters are upper case.

	Parameters:

		base - Optional base to represent the number in (default is base 10).
		       Must be between 2 and 36 inclusive, or an Error will be thrown.

	Returns:

		The string representation of the <BigInteger>.
*/
BigInteger.prototype.toString = function(base) {
	base = +base || 10;
	if (base < 2 || base > 36) {
		throw new Error("illegal radix " + base + ".");
	}
	if (this._s === 0) {
		return "0";
	}
	if (base === 10) {
		var str = this._s < 0 ? "-" : "";
		str += this._d[this._d.length - 1].toString();
		for (var i = this._d.length - 2; i >= 0; i--) {
			var group = this._d[i].toString();
			while (group.length < BigInteger_base_log10) group = '0' + group;
			str += group;
		}
		return str;
	}
	else {
		var numerals = BigInteger.digits;
		base = BigInteger.small[base];
		var sign = this._s;

		var n = this.abs();
		var digits = [];
		var digit;

		while (n._s !== 0) {
			var divmod = n.divRem(base);
			n = divmod[0];
			digit = divmod[1];
			// TODO: This could be changed to unshift instead of reversing at the end.
			// Benchmark both to compare speeds.
			digits.push(numerals[digit.valueOf()]);
		}
		return (sign < 0 ? "-" : "") + digits.reverse().join("");
	}
};

// Verify strings for parsing
BigInteger.radixRegex = [
	/^$/,
	/^$/,
	/^[01]*$/,
	/^[012]*$/,
	/^[0-3]*$/,
	/^[0-4]*$/,
	/^[0-5]*$/,
	/^[0-6]*$/,
	/^[0-7]*$/,
	/^[0-8]*$/,
	/^[0-9]*$/,
	/^[0-9aA]*$/,
	/^[0-9abAB]*$/,
	/^[0-9abcABC]*$/,
	/^[0-9a-dA-D]*$/,
	/^[0-9a-eA-E]*$/,
	/^[0-9a-fA-F]*$/,
	/^[0-9a-gA-G]*$/,
	/^[0-9a-hA-H]*$/,
	/^[0-9a-iA-I]*$/,
	/^[0-9a-jA-J]*$/,
	/^[0-9a-kA-K]*$/,
	/^[0-9a-lA-L]*$/,
	/^[0-9a-mA-M]*$/,
	/^[0-9a-nA-N]*$/,
	/^[0-9a-oA-O]*$/,
	/^[0-9a-pA-P]*$/,
	/^[0-9a-qA-Q]*$/,
	/^[0-9a-rA-R]*$/,
	/^[0-9a-sA-S]*$/,
	/^[0-9a-tA-T]*$/,
	/^[0-9a-uA-U]*$/,
	/^[0-9a-vA-V]*$/,
	/^[0-9a-wA-W]*$/,
	/^[0-9a-xA-X]*$/,
	/^[0-9a-yA-Y]*$/,
	/^[0-9a-zA-Z]*$/
];

/*
	Function: parse
	Parse a string into a <BigInteger>.

	*base* is optional but, if provided, must be from 2 to 36 inclusive. If
	*base* is not provided, it will be guessed based on the leading characters
	of *s* as follows:

	- "0x" or "0X": *base* = 16
	- "0c" or "0C": *base* = 8
	- "0b" or "0B": *base* = 2
	- else: *base* = 10

	If no base is provided, or *base* is 10, the number can be in exponential
	form. For example, these are all valid:

	> BigInteger.parse("1e9");              // Same as "1000000000"
	> BigInteger.parse("1.234*10^3");       // Same as 1234
	> BigInteger.parse("56789 * 10 ** -2"); // Same as 567

	If any characters fall outside the range defined by the radix, an exception
	will be thrown.

	Parameters:

		s - The string to parse.
		base - Optional radix (default is to guess based on *s*).

	Returns:

		a <BigInteger> instance.
*/
BigInteger.parse = function(s, base) {
	// Expands a number in exponential form to decimal form.
	// expandExponential("-13.441*10^5") === "1344100";
	// expandExponential("1.12300e-1") === "0.112300";
	// expandExponential(1000000000000000000000000000000) === "1000000000000000000000000000000";
	function expandExponential(str) {
		str = str.replace(/\s*[*xX]\s*10\s*(\^|\*\*)\s*/, "e");

		return str.replace(/^([+\-])?(\d+)\.?(\d*)[eE]([+\-]?\d+)$/, function(x, s, n, f, c) {
			c = +c;
			var l = c < 0;
			var i = n.length + c;
			x = (l ? n : f).length;
			c = ((c = Math.abs(c)) >= x ? c - x + l : 0);
			var z = (new Array(c + 1)).join("0");
			var r = n + f;
			return (s || "") + (l ? r = z + r : r += z).substr(0, i += l ? z.length : 0) + (i < r.length ? "." + r.substr(i) : "");
		});
	}

	s = s.toString();
	if (typeof base === "undefined" || +base === 10) {
		s = expandExponential(s);
	}

	var prefixRE;
	if (typeof base === "undefined") {
		prefixRE = '0[xcb]';
	}
	else if (base == 16) {
		prefixRE = '0x';
	}
	else if (base == 8) {
		prefixRE = '0c';
	}
	else if (base == 2) {
		prefixRE = '0b';
	}
	else {
		prefixRE = '';
	}
	var parts = new RegExp('^([+\\-]?)(' + prefixRE + ')?([0-9a-z]*)(?:\\.\\d*)?$', 'i').exec(s);
	if (parts) {
		var sign = parts[1] || "+";
		var baseSection = parts[2] || "";
		var digits = parts[3] || "";

		if (typeof base === "undefined") {
			// Guess base
			if (baseSection === "0x" || baseSection === "0X") { // Hex
				base = 16;
			}
			else if (baseSection === "0c" || baseSection === "0C") { // Octal
				base = 8;
			}
			else if (baseSection === "0b" || baseSection === "0B") { // Binary
				base = 2;
			}
			else {
				base = 10;
			}
		}
		else if (base < 2 || base > 36) {
			throw new Error("Illegal radix " + base + ".");
		}

		base = +base;

		// Check for digits outside the range
		if (!(BigInteger.radixRegex[base].test(digits))) {
			throw new Error("Bad digit for radix " + base);
		}

		// Strip leading zeros, and convert to array
		digits = digits.replace(/^0+/, "").split("");
		if (digits.length === 0) {
			return ZERO;
		}

		// Get the sign (we know it's not zero)
		sign = (sign === "-") ? -1 : 1;

		// Optimize 10
		if (base == 10) {
			var d = [];
			while (digits.length >= BigInteger_base_log10) {
				d.push(parseInt(digits.splice(digits.length-BigInteger.base_log10, BigInteger.base_log10).join(''), 10));
			}
			d.push(parseInt(digits.join(''), 10));
			return new BigInteger(d, sign, CONSTRUCT);
		}

		// Do the conversion
		var d = ZERO;
		base = BigInteger.small[base];
		var small = BigInteger.small;
		for (var i = 0; i < digits.length; i++) {
			d = d.multiply(base).add(small[parseInt(digits[i], 36)]);
		}
		return new BigInteger(d._d, sign, CONSTRUCT);
	}
	else {
		throw new Error("Invalid BigInteger format: " + s);
	}
};

/*
	Function: add
	Add two <BigIntegers>.

	Parameters:

		n - The number to add to *this*. Will be converted to a <BigInteger>.

	Returns:

		The numbers added together.

	See Also:

		<subtract>, <multiply>, <quotient>, <next>
*/
BigInteger.prototype.add = function(n) {
	if (this._s === 0) {
		return BigInteger(n);
	}

	n = BigInteger(n);
	if (n._s === 0) {
		return this;
	}
	if (this._s !== n._s) {
		n = n.negate();
		return this.subtract(n);
	}

	var a = this._d;
	var b = n._d;
	var al = a.length;
	var bl = b.length;
	var sum = new Array(Math.max(al, bl) + 1);
	var size = Math.min(al, bl);
	var carry = 0;
	var digit;

	for (var i = 0; i < size; i++) {
		digit = a[i] + b[i] + carry;
		sum[i] = digit % BigInteger_base;
		carry = (digit / BigInteger_base) | 0;
	}
	if (bl > al) {
		a = b;
		al = bl;
	}
	for (i = size; carry && i < al; i++) {
		digit = a[i] + carry;
		sum[i] = digit % BigInteger_base;
		carry = (digit / BigInteger_base) | 0;
	}
	if (carry) {
		sum[i] = carry;
	}

	for ( ; i < al; i++) {
		sum[i] = a[i];
	}

	return new BigInteger(sum, this._s, CONSTRUCT);
};

/*
	Function: negate
	Get the additive inverse of a <BigInteger>.

	Returns:

		A <BigInteger> with the same magnatude, but with the opposite sign.

	See Also:

		<abs>
*/
BigInteger.prototype.negate = function() {
	return new BigInteger(this._d, (-this._s) | 0, CONSTRUCT);
};

/*
	Function: abs
	Get the absolute value of a <BigInteger>.

	Returns:

		A <BigInteger> with the same magnatude, but always positive (or zero).

	See Also:

		<negate>
*/
BigInteger.prototype.abs = function() {
	return (this._s < 0) ? this.negate() : this;
};

/*
	Function: subtract
	Subtract two <BigIntegers>.

	Parameters:

		n - The number to subtract from *this*. Will be converted to a <BigInteger>.

	Returns:

		The *n* subtracted from *this*.

	See Also:

		<add>, <multiply>, <quotient>, <prev>
*/
BigInteger.prototype.subtract = function(n) {
	if (this._s === 0) {
		return BigInteger(n).negate();
	}

	n = BigInteger(n);
	if (n._s === 0) {
		return this;
	}
	if (this._s !== n._s) {
		n = n.negate();
		return this.add(n);
	}

	var m = this;
	// negative - negative => -|a| - -|b| => -|a| + |b| => |b| - |a|
	if (this._s < 0) {
		m = new BigInteger(n._d, 1, CONSTRUCT);
		n = new BigInteger(this._d, 1, CONSTRUCT);
	}

	// Both are positive => a - b
	var sign = m.compareAbs(n);
	if (sign === 0) {
		return ZERO;
	}
	else if (sign < 0) {
		// swap m and n
		var t = n;
		n = m;
		m = t;
	}

	// a > b
	var a = m._d;
	var b = n._d;
	var al = a.length;
	var bl = b.length;
	var diff = new Array(al); // al >= bl since a > b
	var borrow = 0;
	var i;
	var digit;

	for (i = 0; i < bl; i++) {
		digit = a[i] - borrow - b[i];
		if (digit < 0) {
			digit += BigInteger_base;
			borrow = 1;
		}
		else {
			borrow = 0;
		}
		diff[i] = digit;
	}
	for (i = bl; i < al; i++) {
		digit = a[i] - borrow;
		if (digit < 0) {
			digit += BigInteger_base;
		}
		else {
			diff[i++] = digit;
			break;
		}
		diff[i] = digit;
	}
	for ( ; i < al; i++) {
		diff[i] = a[i];
	}

	return new BigInteger(diff, sign, CONSTRUCT);
};

(function() {
	function addOne(n, sign) {
		var a = n._d;
		var sum = a.slice();
		var carry = true;
		var i = 0;

		while (true) {
			var digit = (a[i] || 0) + 1;
			sum[i] = digit % BigInteger_base;
			if (digit <= BigInteger_base - 1) {
				break;
			}
			++i;
		}

		return new BigInteger(sum, sign, CONSTRUCT);
	}

	function subtractOne(n, sign) {
		var a = n._d;
		var sum = a.slice();
		var borrow = true;
		var i = 0;

		while (true) {
			var digit = (a[i] || 0) - 1;
			if (digit < 0) {
				sum[i] = digit + BigInteger_base;
			}
			else {
				sum[i] = digit;
				break;
			}
			++i;
		}

		return new BigInteger(sum, sign, CONSTRUCT);
	}

	/*
		Function: next
		Get the next <BigInteger> (add one).

		Returns:

			*this* + 1.

		See Also:

			<add>, <prev>
	*/
	BigInteger.prototype.next = function() {
		switch (this._s) {
		case 0:
			return ONE;
		case -1:
			return subtractOne(this, -1);
		// case 1:
		default:
			return addOne(this, 1);
		}
	};

	/*
		Function: prev
		Get the previous <BigInteger> (subtract one).

		Returns:

			*this* - 1.

		See Also:

			<next>, <subtract>
	*/
	BigInteger.prototype.prev = function() {
		switch (this._s) {
		case 0:
			return M_ONE;
		case -1:
			return addOne(this, -1);
		// case 1:
		default:
			return subtractOne(this, 1);
		}
	};
})();

/*
	Function: compareAbs
	Compare the absolute value of two <BigIntegers>.

	Calling <compareAbs> is faster than calling <abs> twice, then <compare>.

	Parameters:

		n - The number to compare to *this*. Will be converted to a <BigInteger>.

	Returns:

		-1, 0, or +1 if *|this|* is less than, equal to, or greater than *|n|*.

	See Also:

		<compare>, <abs>
*/
BigInteger.prototype.compareAbs = function(n) {
	if (this === n) {
		return 0;
	}

	if (!(n instanceof BigInteger)) {
		if (!isFinite(n)) {
			return(isNaN(n) ? n : -1);
		}
		n = BigInteger(n);
	}

	if (this._s === 0) {
		return (n._s !== 0) ? -1 : 0;
	}
	if (n._s === 0) {
		return 1;
	}

	var l = this._d.length;
	var nl = n._d.length;
	if (l < nl) {
		return -1;
	}
	else if (l > nl) {
		return 1;
	}

	var a = this._d;
	var b = n._d;
	for (var i = l-1; i >= 0; i--) {
		if (a[i] !== b[i]) {
			return a[i] < b[i] ? -1 : 1;
		}
	}

	return 0;
};

/*
	Function: compare
	Compare two <BigIntegers>.

	Parameters:

		n - The number to compare to *this*. Will be converted to a <BigInteger>.

	Returns:

		-1, 0, or +1 if *this* is less than, equal to, or greater than *n*.

	See Also:

		<compareAbs>, <isPositive>, <isNegative>, <isUnit>
*/
BigInteger.prototype.compare = function(n) {
	if (this === n) {
		return 0;
	}

	n = BigInteger(n);

	if (this._s === 0) {
		return -n._s;
	}

	if (this._s === n._s) { // both positive or both negative
		var cmp = this.compareAbs(n);
		return cmp * this._s;
	}
	else {
		return this._s;
	}
};

/*
	Function: isUnit
	Return true if *this* is either 1 or -1.

	Returns:

		true if *this* compares equal to <BigInteger.ONE> or <BigInteger.M_ONE>.

	See Also:

		<isZero>, <isNegative>, <isPositive>, <compareAbs>, <compare>,
		<BigInteger.ONE>, <BigInteger.M_ONE>
*/
BigInteger.prototype.isUnit = function() {
	return this === ONE ||
		this === M_ONE ||
		(this._d.length === 1 && this._d[0] === 1);
};

/*
	Function: multiply
	Multiply two <BigIntegers>.

	Parameters:

		n - The number to multiply *this* by. Will be converted to a
		<BigInteger>.

	Returns:

		The numbers multiplied together.

	See Also:

		<add>, <subtract>, <quotient>, <square>
*/
BigInteger.prototype.multiply = function(n) {
	// TODO: Consider adding Karatsuba multiplication for large numbers
	if (this._s === 0) {
		return ZERO;
	}

	n = BigInteger(n);
	if (n._s === 0) {
		return ZERO;
	}
	if (this.isUnit()) {
		if (this._s < 0) {
			return n.negate();
		}
		return n;
	}
	if (n.isUnit()) {
		if (n._s < 0) {
			return this.negate();
		}
		return this;
	}
	if (this === n) {
		return this.square();
	}

	var r = (this._d.length >= n._d.length);
	var a = (r ? this : n)._d; // a will be longer than b
	var b = (r ? n : this)._d;
	var al = a.length;
	var bl = b.length;

	var pl = al + bl;
	var partial = new Array(pl);
	var i;
	for (i = 0; i < pl; i++) {
		partial[i] = 0;
	}

	for (i = 0; i < bl; i++) {
		var carry = 0;
		var bi = b[i];
		var jlimit = al + i;
		var digit;
		for (var j = i; j < jlimit; j++) {
			digit = partial[j] + bi * a[j - i] + carry;
			carry = (digit / BigInteger_base) | 0;
			partial[j] = (digit % BigInteger_base) | 0;
		}
		if (carry) {
			digit = partial[j] + carry;
			carry = (digit / BigInteger_base) | 0;
			partial[j] = digit % BigInteger_base;
		}
	}
	return new BigInteger(partial, this._s * n._s, CONSTRUCT);
};

// Multiply a BigInteger by a single-digit native number
// Assumes that this and n are >= 0
// This is not really intended to be used outside the library itself
BigInteger.prototype.multiplySingleDigit = function(n) {
	if (n === 0 || this._s === 0) {
		return ZERO;
	}
	if (n === 1) {
		return this;
	}

	var digit;
	if (this._d.length === 1) {
		digit = this._d[0] * n;
		if (digit >= BigInteger_base) {
			return new BigInteger([(digit % BigInteger_base)|0,
					(digit / BigInteger_base)|0], 1, CONSTRUCT);
		}
		return new BigInteger([digit], 1, CONSTRUCT);
	}

	if (n === 2) {
		return this.add(this);
	}
	if (this.isUnit()) {
		return new BigInteger([n], 1, CONSTRUCT);
	}

	var a = this._d;
	var al = a.length;

	var pl = al + 1;
	var partial = new Array(pl);
	for (var i = 0; i < pl; i++) {
		partial[i] = 0;
	}

	var carry = 0;
	for (var j = 0; j < al; j++) {
		digit = n * a[j] + carry;
		carry = (digit / BigInteger_base) | 0;
		partial[j] = (digit % BigInteger_base) | 0;
	}
	if (carry) {
		partial[j] = carry;
	}

	return new BigInteger(partial, 1, CONSTRUCT);
};

/*
	Function: square
	Multiply a <BigInteger> by itself.

	This is slightly faster than regular multiplication, since it removes the
	duplicated multiplcations.

	Returns:

		> this.multiply(this)

	See Also:
		<multiply>
*/
BigInteger.prototype.square = function() {
	// Normally, squaring a 10-digit number would take 100 multiplications.
	// Of these 10 are unique diagonals, of the remaining 90 (100-10), 45 are repeated.
	// This procedure saves (N*(N-1))/2 multiplications, (e.g., 45 of 100 multiplies).
	// Based on code by Gary Darby, Intellitech Systems Inc., www.DelphiForFun.org

	if (this._s === 0) {
		return ZERO;
	}
	if (this.isUnit()) {
		return ONE;
	}

	var digits = this._d;
	var length = digits.length;
	var imult1 = new Array(length + length + 1);
	var product, carry, k;
	var i;

	// Calculate diagonal
	for (i = 0; i < length; i++) {
		k = i * 2;
		product = digits[i] * digits[i];
		carry = (product / BigInteger_base) | 0;
		imult1[k] = product % BigInteger_base;
		imult1[k + 1] = carry;
	}

	// Calculate repeating part
	for (i = 0; i < length; i++) {
		carry = 0;
		k = i * 2 + 1;
		for (var j = i + 1; j < length; j++, k++) {
			product = digits[j] * digits[i] * 2 + imult1[k] + carry;
			carry = (product / BigInteger_base) | 0;
			imult1[k] = product % BigInteger_base;
		}
		k = length + i;
		var digit = carry + imult1[k];
		carry = (digit / BigInteger_base) | 0;
		imult1[k] = digit % BigInteger_base;
		imult1[k + 1] += carry;
	}

	return new BigInteger(imult1, 1, CONSTRUCT);
};

/*
	Function: quotient
	Divide two <BigIntegers> and truncate towards zero.

	<quotient> throws an exception if *n* is zero.

	Parameters:

		n - The number to divide *this* by. Will be converted to a <BigInteger>.

	Returns:

		The *this* / *n*, truncated to an integer.

	See Also:

		<add>, <subtract>, <multiply>, <divRem>, <remainder>
*/
BigInteger.prototype.quotient = function(n) {
	return this.divRem(n)[0];
};

/*
	Function: divide
	Deprecated synonym for <quotient>.
*/
BigInteger.prototype.divide = BigInteger.prototype.quotient;

/*
	Function: remainder
	Calculate the remainder of two <BigIntegers>.

	<remainder> throws an exception if *n* is zero.

	Parameters:

		n - The remainder after *this* is divided *this* by *n*. Will be
		    converted to a <BigInteger>.

	Returns:

		*this* % *n*.

	See Also:

		<divRem>, <quotient>
*/
BigInteger.prototype.remainder = function(n) {
	return this.divRem(n)[1];
};

/*
	Function: divRem
	Calculate the integer quotient and remainder of two <BigIntegers>.

	<divRem> throws an exception if *n* is zero.

	Parameters:

		n - The number to divide *this* by. Will be converted to a <BigInteger>.

	Returns:

		A two-element array containing the quotient and the remainder.

		> a.divRem(b)

		is exactly equivalent to

		> [a.quotient(b), a.remainder(b)]

		except it is faster, because they are calculated at the same time.

	See Also:

		<quotient>, <remainder>
*/
BigInteger.prototype.divRem = function(n) {
	n = BigInteger(n);
	if (n._s === 0) {
		throw new Error("Divide by zero");
	}
	if (this._s === 0) {
		return [ZERO, ZERO];
	}
	if (n._d.length === 1) {
		return this.divRemSmall(n._s * n._d[0]);
	}

	// Test for easy cases -- |n1| <= |n2|
	switch (this.compareAbs(n)) {
	case 0: // n1 == n2
		return [this._s === n._s ? ONE : M_ONE, ZERO];
	case -1: // |n1| < |n2|
		return [ZERO, this];
	}

	var sign = this._s * n._s;
	var a = n.abs();
	var b_digits = this._d;
	var b_index = b_digits.length;
	var digits = n._d.length;
	var quot = [];
	var guess;

	var part = new BigInteger([], 0, CONSTRUCT);
	part._s = 1;

	while (b_index) {
		part._d.unshift(b_digits[--b_index]);

		if (part.compareAbs(n) < 0) {
			quot.push(0);
			continue;
		}
		if (part._s === 0) {
			guess = 0;
		}
		else {
			var xlen = part._d.length, ylen = a._d.length;
			var highx = part._d[xlen-1]*BigInteger_base + part._d[xlen-2];
			var highy = a._d[ylen-1]*BigInteger_base + a._d[ylen-2];
			if (part._d.length > a._d.length) {
				// The length of part._d can either match a._d length,
				// or exceed it by one.
				highx = (highx+1)*BigInteger_base;
			}
			guess = Math.ceil(highx/highy);
		}
		do {
			var check = a.multiplySingleDigit(guess);
			if (check.compareAbs(part) <= 0) {
				break;
			}
			guess--;
		} while (guess);

		quot.push(guess);
		if (!guess) {
			continue;
		}
		var diff = part.subtract(check);
		part._d = diff._d.slice();
		if (part._d.length === 0) {
			part._s = 0;
		}
	}

	return [new BigInteger(quot.reverse(), sign, CONSTRUCT),
		   new BigInteger(part._d, this._s, CONSTRUCT)];
};

// Throws an exception if n is outside of (-BigInteger.base, -1] or
// [1, BigInteger.base).  It's not necessary to call this, since the
// other division functions will call it if they are able to.
BigInteger.prototype.divRemSmall = function(n) {
	var r;
	n = +n;
	if (n === 0) {
		throw new Error("Divide by zero");
	}

	var n_s = n < 0 ? -1 : 1;
	var sign = this._s * n_s;
	n = Math.abs(n);

	if (n < 1 || n >= BigInteger_base) {
		throw new Error("Argument out of range");
	}

	if (this._s === 0) {
		return [ZERO, ZERO];
	}

	if (n === 1 || n === -1) {
		return [(sign === 1) ? this.abs() : new BigInteger(this._d, sign, CONSTRUCT), ZERO];
	}

	// 2 <= n < BigInteger_base

	// divide a single digit by a single digit
	if (this._d.length === 1) {
		var q = new BigInteger([(this._d[0] / n) | 0], 1, CONSTRUCT);
		r = new BigInteger([(this._d[0] % n) | 0], 1, CONSTRUCT);
		if (sign < 0) {
			q = q.negate();
		}
		if (this._s < 0) {
			r = r.negate();
		}
		return [q, r];
	}

	var digits = this._d.slice();
	var quot = new Array(digits.length);
	var part = 0;
	var diff = 0;
	var i = 0;
	var guess;

	while (digits.length) {
		part = part * BigInteger_base + digits[digits.length - 1];
		if (part < n) {
			quot[i++] = 0;
			digits.pop();
			diff = BigInteger_base * diff + part;
			continue;
		}
		if (part === 0) {
			guess = 0;
		}
		else {
			guess = (part / n) | 0;
		}

		var check = n * guess;
		diff = part - check;
		quot[i++] = guess;
		if (!guess) {
			digits.pop();
			continue;
		}

		digits.pop();
		part = diff;
	}

	r = new BigInteger([diff], 1, CONSTRUCT);
	if (this._s < 0) {
		r = r.negate();
	}
	return [new BigInteger(quot.reverse(), sign, CONSTRUCT), r];
};

/*
	Function: isEven
	Return true iff *this* is divisible by two.

	Note that <BigInteger.ZERO> is even.

	Returns:

		true if *this* is even, false otherwise.

	See Also:

		<isOdd>
*/
BigInteger.prototype.isEven = function() {
	var digits = this._d;
	return this._s === 0 || digits.length === 0 || (digits[0] % 2) === 0;
};

/*
	Function: isOdd
	Return true iff *this* is not divisible by two.

	Returns:

		true if *this* is odd, false otherwise.

	See Also:

		<isEven>
*/
BigInteger.prototype.isOdd = function() {
	return !this.isEven();
};

/*
	Function: sign
	Get the sign of a <BigInteger>.

	Returns:

		* -1 if *this* < 0
		* 0 if *this* == 0
		* +1 if *this* > 0

	See Also:

		<isZero>, <isPositive>, <isNegative>, <compare>, <BigInteger.ZERO>
*/
BigInteger.prototype.sign = function() {
	return this._s;
};

/*
	Function: isPositive
	Return true iff *this* > 0.

	Returns:

		true if *this*.compare(<BigInteger.ZERO>) == 1.

	See Also:

		<sign>, <isZero>, <isNegative>, <isUnit>, <compare>, <BigInteger.ZERO>
*/
BigInteger.prototype.isPositive = function() {
	return this._s > 0;
};

/*
	Function: isNegative
	Return true iff *this* < 0.

	Returns:

		true if *this*.compare(<BigInteger.ZERO>) == -1.

	See Also:

		<sign>, <isPositive>, <isZero>, <isUnit>, <compare>, <BigInteger.ZERO>
*/
BigInteger.prototype.isNegative = function() {
	return this._s < 0;
};

/*
	Function: isZero
	Return true iff *this* == 0.

	Returns:

		true if *this*.compare(<BigInteger.ZERO>) == 0.

	See Also:

		<sign>, <isPositive>, <isNegative>, <isUnit>, <BigInteger.ZERO>
*/
BigInteger.prototype.isZero = function() {
	return this._s === 0;
};

/*
	Function: exp10
	Multiply a <BigInteger> by a power of 10.

	This is equivalent to, but faster than

	> if (n >= 0) {
	>     return this.multiply(BigInteger("1e" + n));
	> }
	> else { // n <= 0
	>     return this.quotient(BigInteger("1e" + -n));
	> }

	Parameters:

		n - The power of 10 to multiply *this* by. *n* is converted to a
		javascipt number and must be no greater than <BigInteger.MAX_EXP>
		(0x7FFFFFFF), or an exception will be thrown.

	Returns:

		*this* * (10 ** *n*), truncated to an integer if necessary.

	See Also:

		<pow>, <multiply>
*/
BigInteger.prototype.exp10 = function(n) {
	n = +n;
	if (n === 0) {
		return this;
	}
	if (Math.abs(n) > Number(MAX_EXP)) {
		throw new Error("exponent too large in BigInteger.exp10");
	}
	if (n > 0) {
		var k = new BigInteger(this._d.slice(), this._s, CONSTRUCT);

		for (; n >= BigInteger_base_log10; n -= BigInteger_base_log10) {
			k._d.unshift(0);
		}
		if (n == 0)
			return k;
		k._s = 1;
		k = k.multiplySingleDigit(Math.pow(10, n));
		return (this._s < 0 ? k.negate() : k);
	} else if (-n >= this._d.length*BigInteger_base_log10) {
		return ZERO;
	} else {
		var k = new BigInteger(this._d.slice(), this._s, CONSTRUCT);

		for (n = -n; n >= BigInteger_base_log10; n -= BigInteger_base_log10) {
			k._d.shift();
		}
		return (n == 0) ? k : k.divRemSmall(Math.pow(10, n))[0];
	}
};

/*
	Function: pow
	Raise a <BigInteger> to a power.

	In this implementation, 0**0 is 1.

	Parameters:

		n - The exponent to raise *this* by. *n* must be no greater than
		<BigInteger.MAX_EXP> (0x7FFFFFFF), or an exception will be thrown.

	Returns:

		*this* raised to the *nth* power.

	See Also:

		<modPow>
*/
BigInteger.prototype.pow = function(n) {
	if (this.isUnit()) {
		if (this._s > 0) {
			return this;
		}
		else {
			return BigInteger(n).isOdd() ? this : this.negate();
		}
	}

	n = BigInteger(n);
	if (n._s === 0) {
		return ONE;
	}
	else if (n._s < 0) {
		if (this._s === 0) {
			throw new Error("Divide by zero");
		}
		else {
			return ZERO;
		}
	}
	if (this._s === 0) {
		return ZERO;
	}
	if (n.isUnit()) {
		return this;
	}

	if (n.compareAbs(MAX_EXP) > 0) {
		throw new Error("exponent too large in BigInteger.pow");
	}
	var x = this;
	var aux = ONE;
	var two = BigInteger.small[2];

	while (n.isPositive()) {
		if (n.isOdd()) {
			aux = aux.multiply(x);
			if (n.isUnit()) {
				return aux;
			}
		}
		x = x.square();
		n = n.quotient(two);
	}

	return aux;
};

/*
	Function: modPow
	Raise a <BigInteger> to a power (mod m).

	Because it is reduced by a modulus, <modPow> is not limited by
	<BigInteger.MAX_EXP> like <pow>.

	Parameters:

		exponent - The exponent to raise *this* by. Must be positive.
		modulus - The modulus.

	Returns:

		*this* ^ *exponent* (mod *modulus*).

	See Also:

		<pow>, <mod>
*/
BigInteger.prototype.modPow = function(exponent, modulus) {
	var result = ONE;
	var base = this;

	while (exponent.isPositive()) {
		if (exponent.isOdd()) {
			result = result.multiply(base).remainder(modulus);
		}

		exponent = exponent.quotient(BigInteger.small[2]);
		if (exponent.isPositive()) {
			base = base.square().remainder(modulus);
		}
	}

	return result;
};

/*
	Function: log
	Get the natural logarithm of a <BigInteger> as a native JavaScript number.

	This is equivalent to

	> Math.log(this.toJSValue())

	but handles values outside of the native number range.

	Returns:

		log( *this* )

	See Also:

		<toJSValue>
*/
BigInteger.prototype.log = function() {
	switch (this._s) {
	case 0:	 return -Infinity;
	case -1: return NaN;
	default: // Fall through.
	}

	var l = this._d.length;

	if (l*BigInteger_base_log10 < 30) {
		return Math.log(this.valueOf());
	}

	var N = Math.ceil(30/BigInteger_base_log10);
	var firstNdigits = this._d.slice(l - N);
	return Math.log((new BigInteger(firstNdigits, 1, CONSTRUCT)).valueOf()) + (l - N) * Math.log(BigInteger_base);
};

/*
	Function: valueOf
	Convert a <BigInteger> to a native JavaScript integer.

	This is called automatically by JavaScipt to convert a <BigInteger> to a
	native value.

	Returns:

		> parseInt(this.toString(), 10)

	See Also:

		<toString>, <toJSValue>
*/
BigInteger.prototype.valueOf = function() {
	return parseInt(this.toString(), 10);
};

/*
	Function: toJSValue
	Convert a <BigInteger> to a native JavaScript integer.

	This is the same as valueOf, but more explicitly named.

	Returns:

		> parseInt(this.toString(), 10)

	See Also:

		<toString>, <valueOf>
*/
BigInteger.prototype.toJSValue = function() {
	return parseInt(this.toString(), 10);
};

var MAX_EXP = BigInteger(0x7FFFFFFF);
// Constant: MAX_EXP
// The largest exponent allowed in <pow> and <exp10> (0x7FFFFFFF or 2147483647).
BigInteger.MAX_EXP = MAX_EXP;

(function() {
	function makeUnary(fn) {
		return function(a) {
			return fn.call(BigInteger(a));
		};
	}

	function makeBinary(fn) {
		return function(a, b) {
			return fn.call(BigInteger(a), BigInteger(b));
		};
	}

	function makeTrinary(fn) {
		return function(a, b, c) {
			return fn.call(BigInteger(a), BigInteger(b), BigInteger(c));
		};
	}

	(function() {
		var i, fn;
		var unary = "toJSValue,isEven,isOdd,sign,isZero,isNegative,abs,isUnit,square,negate,isPositive,toString,next,prev,log".split(",");
		var binary = "compare,remainder,divRem,subtract,add,quotient,divide,multiply,pow,compareAbs".split(",");
		var trinary = ["modPow"];

		for (i = 0; i < unary.length; i++) {
			fn = unary[i];
			BigInteger[fn] = makeUnary(BigInteger.prototype[fn]);
		}

		for (i = 0; i < binary.length; i++) {
			fn = binary[i];
			BigInteger[fn] = makeBinary(BigInteger.prototype[fn]);
		}

		for (i = 0; i < trinary.length; i++) {
			fn = trinary[i];
			BigInteger[fn] = makeTrinary(BigInteger.prototype[fn]);
		}

		BigInteger.exp10 = function(x, n) {
			return BigInteger(x).exp10(n);
		};
	})();
})();

exports.BigInteger = BigInteger;
})(typeof exports !== 'undefined' ? exports : this);

/*
 * rational.js - Javascript tools and libraries based around rational numbers.
 * Copyright (C) 2013 Dylan Ferris
 *
 * The rest of this file is part of rational.js.
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
 * @class Arbitrary Sized Integer
 * @name bigint
 * @requires BigInteger (for now...)
 */
var bigint = {};

/**
 * Find the greatest common divisor of two big integers
 *
 * @param {BigInteger} a the first operand
 * @param {BigInteger} b the second operand
 * @returns {BigInteger} greatest common divisor
 */
bigint.greatest_common_divisor = function(a, b) {
	if (b.isUnit() || a.isUnit()) return BigInteger.ONE;
	var t;
	while (!b.isZero()) {
		t = b;
		b = a.remainder(b);
		a = t;
	}
	return a;
}

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
var BIGINT_ZERO = bigint.fromInteger(0);

/**
 * One, the multiplicative identity
 *
 * @property bigint_ONE
 * @type bigint_ARRAY_TYPE
 * @static
 * @final
 */
var BIGINT_ONE = bigint.fromInteger(1);
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
	//var RAT_MAX_LOOPS = Math.pow(2, 32);
	var RAT_MAX_LOOPS = 16777216
	//var RAT_MAX_LOOPS = 4096;
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
	if (a[0]===0) {
		out[0] = 0;
		out[1] = 1;
		return out;
	}
	if (a[1]===0){
		out[0] = 1;
		out[1] = 0;
		return out;
	}
	if (a[0]===a[1]){
		out[0] = 1;
		out[1] = 1;
		return out;
	}
	if (a[1] > 0) {
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
	if (out[1]<0) {
		out[0] = -out[0];
		out[1] = -out[1];
	}
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
	while ( !rat.approximates(a, r) && c-- ) {
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
 * Returns an array of integers representing the continued fraction
 *
 * @param {rat} a number to convert to a continued fraction
 * @param {Integer} maximum number of iterations
 * @returns {Array} integers of the continued fraction
 */
rat.toContinuedFraction = function (a, loop_limit) {
	loop_limit = typeof loop_limit==='undefined' ? 65536 : parseInt(loop_limit);
	if (rat.equals(a, rat.ZERO)) return [0];
	if (rat.equals(a, rat.ONE)) return [1];
	if (rat.equals(a, rat.NEGONE)) return [-1];
	if (rat.equals(a, rat.INFINITY)) return [1, 0];
	if (rat.equals(a, rat.INFINULL)) return [0, 0];

	var neg = rat.isNegative(a);
	if (neg) a[0] = -a[0];
	
	var r = rat.clone(rat.ONE);
	
	var m = [1,0,0,1];
	
	var direction = 1;
	var result = [0];
	var result_last = result.length - 1;
	
	while ( !rat.equals(a, r) && loop_limit-- ) {
		if (rat.isLessThan(a, r)) {
			if (direction===-1) {
				result[result_last]++;
			}
			else {
				direction = -1;
				result.push(1);
				result_last++;
			}
			m[0] += m[1];
			m[2] += m[3];
		}
		else {
			if (direction===1) {
				result[result_last]++;
			}
			else {
				direction = 1;
				result.push(1);
				result_last++;
			}
			m[1] += m[0];
			m[3] += m[2];
		}
		r[0] = m[0] + m[1];
		r[1] = m[2] + m[3];
	}

	// add a zero to the end to indicate an incomplete result
	if (loop_limit<0) result.push(0);
	else result[result_last]++;
	
	if (neg) for (var i in result) result[i] = -result[i];
	
	return result;
};

/**
 * Returns a rat from an array of integers representing a continued fraction
 *
 * @param {rat} out the receiving number
 * @param {Array} integers of the continued fraction
 * @returns {rat} out
 */
rat.fromContinuedFraction = function(out, cf) {
	rat.fromInteger_copy(out, cf[cf.length-1]);
	for (var i=cf.length-2;i>-1;i--) {
		rat.invert(out, out);
		rat.add(out, rat.fromInteger(cf[i]), out);
	}
	return out;
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
	+ '\nCF:\t['+rat.toContinuedFraction(r)+']'
	//+ '\nSB:\t'+rat.traceSternBrocot(r)
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
 * Returns a rat from a bigrat
 *
 * @param {rat} out the receiving number
 * @param {bigrat} a number to truncate
 * @returns {rat} out
 */
bigrat.toRat = function (out, a) {
	return rat.set(out, a[0].toJSValue(), a[1].toJSValue());
};

/**
 * Returns a bigrat from a rat
 *
 * @param {bigrat} out the receiving number
 * @param {rat} a number to convert
 * @returns {bigrat} out
 */
bigrat.fromRat = function (out, a) {
	return bigrat.set(out, BigInteger(a[0]), BigInteger(a[1]));
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
	if (out[1].isNegative()) {
		out[0] = out[0].negate();
		out[1] = out[1].negate();
	}
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
	// ... comparing the numerator to the denominator multiplied by the target decimal
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
	
	var c = 65536;
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
 * Returns an array of integers representing the continued fraction
 *
 * @param {bigrat} a number to convert to a continued fraction
 * @param {Integer} maximum number of iterations
 * @returns {Array} integers of the continued fraction
 */
bigrat.toContinuedFraction = function (a, loop_limit) {
	loop_limit = typeof loop_limit==='undefined' ? 65536 : parseInt(loop_limit);
	if (bigrat.equals(a, bigrat.ZERO)) return [0];
	if (bigrat.equals(a, bigrat.ONE)) return [1];
	if (bigrat.equals(a, bigrat.NEGONE)) return [-1];
	if (bigrat.equals(a, bigrat.INFINITY)) return [1, 0];
	if (bigrat.equals(a, bigrat.INFINULL)) return [0, 0];

	var neg = bigrat.isNegative(a);
	if (neg) a[0] = a[0].negate();
	
	var r = bigrat.clone(bigrat.ONE);
	
	var m = [
		BigInteger(1),
		BigInteger(0),
		BigInteger(0),
		BigInteger(1)
	];
	
	var direction = 1;
	var result = [0];
	var result_last = result.length - 1;
	
	while ( !bigrat.equals(a, r) && loop_limit-- ) {
		if (bigrat.isLessThan(a, r)) {
			if (direction===-1) {
				result[result_last]++;
			}
			else {
				direction = -1;
				result.push(1);
				result_last++;
			}
			m[0] = m[0].add(m[1]);
			m[2] = m[2].add(m[3]);
		}
		else {
			if (direction===1) {
				result[result_last]++;
			}
			else {
				direction = 1;
				result.push(1);
				result_last++;
			}
			m[1] = m[1].add(m[0]);
			m[3] = m[3].add(m[2]);
		}
		r[0] = m[0].add(m[1]);
		r[1] = m[2].add(m[3]);
	}

	// add a zero to the end to indicate an incomplete result
	if (loop_limit<0) result.push(0);
	else result[result_last]++;
	
	if (neg) for (var i in result) result[i] = -result[i];
	
	return result;
};

/**
 * Returns a bigrat from an array of integers representing a continued fraction
 *
 * @param {bigrat} out the receiving number
 * @param {Array} integers of the continued fraction
 * @returns {bigrat} out
 */
bigrat.fromContinuedFraction = function(out, cf) {
	bigrat.fromInteger_copy(out, cf[cf.length-1]);
	for (var i=cf.length-2;i>-1;i--) {
		bigrat.invert(out, out);
		bigrat.add(out, bigrat.fromInteger(cf[i]), out);
	}
	return out;
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
	+ '\nCF:\t['+bigrat.toContinuedFraction(r)+']'
//	+ '\nSB:\t'+bigrat.traceSternBrocot(r)
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
 * Chainable wrapper functions for rat.js
 *
 * @class Rational Number (Chainable)
 * @name rational
 * @requires integer rat
 */
var rational = function(numerator, denominator) {
	//if (numerator.constructor.name==='rational'||numerator.denominator.name==='rational') return rational.divide(numerator, denominator);
	this.a = rat.fromValues(parseInt(numerator), parseInt(denominator));
}

/**
 * Expresses the rational in a string as "numerator/denominator"
 *
 * @returns {String} numerator/denominator
 */
rational.prototype.toString = function() {
	return rat.str(this.a);
};

/**
 * Returns a rational from an array of integers representing a continued fraction
 *
 * @param {Integer} maximum number of iterations
 * @returns {Array} integers of the continued fraction
 */
rational.prototype.toContinuedFraction = function(loop_limit) {
	return rat.toContinuedFraction(this.a, loop_limit);
};

/**
 * Inverts a rational
 *
 * @returns {rational} out
 */
rational.prototype.invert = function() {
	return rat.invert(this.a);
};

/**
 * Alias for {@link rational.invert}
 * @function
 */
rational.prototype.reciprocal = rational.prototype.invert;

/**
 * Add
 *
 * @param {rational} b the second operand
 * @returns {rational} out
 */
rational.prototype.add = function(b) {
	var out = rat.create();
	rat.add(out, this.a, b.a);
	return new rational(out[0], out[1]);
};

/**
 * Alias for {@link rational.add}
 * @function
 */
rational.prototype.plus = rational.prototype.add;

/**
 * Subtract
 *
 * @param {rat} b the second operand
 * @returns {rat} out
 */
rational.prototype.subtract = function(b) {
	var out = rat.create();
	rat.sub(out, this.a, b.a);
	return new rational(out[0], out[1]);
};

/**
 * Alias for {@link rational.subtract}
 * @function
 */
rational.prototype.sub = rational.prototype.subtract;

/**
 * Alias for {@link rational.subtract}
 * @function
 */
rational.prototype.minus = rational.prototype.subtract;

/**
 * Multiplies two rationals
 *
 * @param {rational} b the second operand
 * @returns {rat} out
 */
rational.prototype.multiply = function(b) {
	var out = rat.create();
	rat.mul(out, this.a, b.a);
	return new rational(out[0], out[1]);
};

/**
 * Alias for {@link rational.prototype.multiply}
 * @function
 */
rational.prototype.mul = rational.prototype.multiply;

/**
 * Alias for {@link rational.prototype.multiply}
 * @function
 */
rational.prototype.times = rational.prototype.multiply;

/**
 * Mediant of two rationals
 *
 * @param {rat} b the second operand
 * @returns {rat} out the sum of the numerators divided by the sum of the denominators
 */
rational.prototype.mediant = function(b) {
	var out = rat.create();
	rat.mediant(out, this.a, b.a);
	return new rational(out[0], out[1]);
};

/**
 * Divides two rationals
 *
 * @param {rational} b the second operand
 * @returns {rational} out
 */
rational.prototype.divide = function(b) {
	var out = rat.create();
	rat.div(out, this.a, b.a);
	return new rational(out[0], out[1]);
};

/**
 * Alias for {@link rational.divide}
 * @function
 */
rational.prototype.div = rational.prototype.divide;

/**
 * Alias for {@link rational.divide}
 * @function
 */
rational.prototype.divided_by = rational.prototype.divide;

/**
 * Raises a rat to an integer exponent
 *
 * @param {Integer} p power to raise the number by
 * @returns {rat} out
 */
rational.prototype.power = function(p) {
	var out = rat.create();
	rat.pow(out, this.a, p);
	return new rational(out[0], out[1]);
};

/**
 * Alias for {@link rational.power}
 * @function
 */
rational.prototype.pow = rational.prototype.power;

/**
 * Returns a string with the fraction in various formats
 *
 * @returns {String} string various conversions
 */
rational.prototype.dump = function() {
	return rat.dump(this.a);
};

/**
 * Returns a rat array from a rational
 *
 * @returns {rat} out
 */
rational.prototype.toRat = function () {
	return rat.clone(this.a);
};

/**
 * Returns a decimal approximation
 *
 * @returns {Number} out
 */
rational.prototype.toDecimal = function () {
	return rat.toDecimal(this.a);
};

/**
 * Returns a rational from a rat array
 *
 * @param {rat} rat
 * @returns {rational} out
 */
rational.fromRat = function (a) {
	var r = new rational();
	r.a[0] = a[0];
	r.a[1] = a[1];
	return r;
};

/**
 * Returns a rational from an integer
 *
 * @param {Integer} signed integer
 * @returns {rational} out
 */
rational.fromInteger = function (a) {
	return rational.fromRat(rat.fromInteger(a));
};

/**
 * Returns a rational from the inverse of an integer
 *
 * @param {Integer} signed integer
 * @returns {rational} out
 */
rational.fromIntegerInverse = function (a) {
	return rational.fromRat(rat.fromIntegerInverse(a));
};

/**
 * Returns a rational from a decimal number
 * 
 * @param {Number} a decimal number
 * @returns {rational} out
 */
rational.fromDecimal = function (a) {
	return rational.fromRat(rat.fromDecimal(a));
};

/**
 * Returns a rational from an array of integers representing a continued fraction
 *
 * @param {Array} integers of the continued fraction
 * @returns {rational} out
 */
rational.fromContinuedFraction = function(cf) {
	return rational.fromRat(rat.fromContinuedFraction(rat.create(), cf));
};
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

var vars = [];

// α - ω
for (var i = 0; i < 25; i++) {
	vars[i] = String.fromCharCode(i+945);
}

// Α - Ω
for (var i = 0; i < 25; i++) {
	if (i+913 !== 930)
		vars[25+i] = String.fromCharCode(i+913);
}

/*

var vars_index = -1;

function next_available_letter() {
	vars_index++;
	return vars[vars_index];
}

*/
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
 * @class Physics
 * @name physics
 * @requires bigrat
 */
var physics = {};

/**
 * Fine-structure constant (α)
 *
 * @property FINESTRUCTURE
 * @type bigrat
 * @static
 * @final
 */
physics.FINESTRUCTURE = bigrat.fromValues(100478167, 13769126000);

/**
 * Alias for {@link physics.FINESTRUCTURE}
 * @type bigrat
 * @static
 * @final
 */
physics.A = physics.FINESTRUCTURE;

/**
 * Planck's constant (h) in Joule seconds
 *
 * @property PLANK
 * @type bigrat
 * @static
 * @final
 */
physics.PLANK = bigrat.fromValues(662606957, 1e42);

/**
 * Alias for {@link physics.PLANKS}
 * @type rat
 * @static
 * @final
 */
physics.H = physics.PLANK;

/**
 * Reduced Planck's constant (h / 2π)
 *
 * @property HBAR
 * @type bigrat
 * @static
 * @final
 */
physics.HBAR = bigrat.fromValues(1054571726, 1e43);
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
 * @requires rat alpha
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
	out[1].push(a.length);
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
	out[1].push(0);
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
 * Calculates the derivates of a polynumber
 *
 * @param {polyrat} a the polynumber to take the derivatives of
 * @returns {Array} array of polyrats, with the same dimensions as the input polyrat ( 0th entry is the input polynumber itself )
 */
polyrat.derivatives = function(a) {
	// MF78 @ 10:00
	return [
		polyrat.clone(a), polyrat.clone(a),
		polyrat.clone(a), polyrat.clone(a),
	];
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
 * @property ZERO
 * @type polyrat
 * @static
 * @final
 */
var polyrat.ZERO = polyrat.fromValues([0]);

/**
 * One, the multiplicative identity
 *
 * @property IDENTITY
 * @type polyrat
 * @static
 * @final
 */
var polyrat.IDENTITY = polyrat.fromValues([1]);
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
 * Where old code comes to die...
 */
 
var RAT_ZERO = rat.ZERO;
var RAT_ONE = rat.ONE;
var RAT_INFINITY = rat.INFINITY;
var RAT_INFINULL = rat.INFINULL;
var RAT_INFINITESIMAL = rat.INFINITESIMAL;
