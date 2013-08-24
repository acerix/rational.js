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

// for nodejs
if (typeof rat !== 'object') {
  var rat = require('../src/rat.js').rat;
}
if (typeof alpha !== 'object') {
  var alpha = require('../src/alpha.js').alpha;
}

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
		[] // array of integers to offset the exponents of each dimension
	];
};

/**
 * Creates a new polynumber initialized with the given array of either integers or rats
 *
 * @param {Array} array of values (of type "rat" --- not yet)
 * @returns {polyrat} a new polynumber
 */
polyrat.fromValues = function(a) {
	var out = polyrat.create();
	out[0] = a.slice();
	
	var d = polyrat.countDimensions(out);

	out[1] = new Array(d);
	
	var i=d;
	while (i--) out[1][i] = 0;
	
	/*
	if (d===1) {
		for (var i in out[0]) {
			if (typeof out[0][i] !== 'object') out[0][i] = rat.fromDecimal(out[0][i]);
		}
	}
	else if (d===2) {
		for (var j in out[0]) {
			for (var i in out[0][j]) {
				if (typeof out[0][j][i] !== 'object') out[0][j][i] = rat.fromDecimal(out[0][j][i]);
			}
		}
	}
	else if (d===3) {
		for (var k in out[0]) {
			for (var j in out[0][k]) {
				for (var i in out[0][k][j]) {
					if (typeof out[0][k][j][i] !== 'object') out[0][k][j][i] = rat.fromDecimal(out[0][k][j][i]);
				}
			}
		}
	}
	else {
		// recursive function?
		alert('unsupported dimension '+d);
	}
	*/
	
	return polyrat.normalize(out, out);
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
	out[0] = [a.slice()];
	out[1].push(0);
	for (var i in m) out[0].push(m[i]);
	return out;
};

/**
 * Evaluate a polynomial for a certain variable(s)
 *
 * @param {bigrat} out the receiving number
 * @param {polyrat} a the polynumber to evaluate 
 * @param {Array} array of values (of type "bigrat") to plug in to the polynomial
 * @returns {bigrat} resulting big rational number
 */
polyrat.evaluate = function(out, a, m) {
	//var result = 0;
	bigrat.copy(out, bigrat.ZERO);
	var d = polyrat.countDimensions(a);
	if (d===0) {
		return '0';
	}
	else if (d===1) {
		for (var i in a[0]) {
			if (!a[0][i]) continue;
			//result += a[0][i] * Math.pow(m[0], a[1][0] + +i);
			var p = bigrat.fromInteger(a[0][i]);
			var pi = bigrat.pow(bigrat.create(), bigrat.fromInteger(m[0]), a[1][0] + +i);
			bigrat.mul(p, p, pi);
			bigrat.add(out, out, p);
		}
	}
	else if (d===2) {
		for (var j in a[0]) {
			for (var i in a[0][j]) {
				if (!a[0][j][i]) continue;
				//result += a[0][j][i] * Math.pow(m[0], a[1][1] + +i) * Math.pow(m[1], a[1][0] + +j);
				var p = bigrat.fromInteger(a[0][j][i]);
				var pi = bigrat.pow(bigrat.create(), bigrat.fromInteger(m[0]), a[1][1] + +i);
				var pj = bigrat.pow(bigrat.create(), bigrat.fromInteger(m[1]), a[1][0] + +j);
				bigrat.mul(p, p, pi);
				bigrat.mul(p, p, pj);
				bigrat.add(out, out, p);
			}
		}
	}
	else if (d===3) {
		for (var k in a[0]) {
			for (var j in a[0][k]) {
				for (var i in a[0][k][j]) {
					if (!a[0][k][j][i]) continue;
					//result += a[0][k][j][i] * Math.pow(m[0], a[1][2] + +i) * Math.pow(m[1], a[1][1] + +j) * Math.pow(m[2], a[1][0] + +k);
					var p = bigrat.fromInteger(a[0][k][j][i]);
					var pi = bigrat.pow(bigrat.create(), bigrat.fromInteger(m[0]), a[1][2] + +i);
					var pj = bigrat.pow(bigrat.create(), bigrat.fromInteger(m[1]), a[1][1] + +j);
					var pk = bigrat.pow(bigrat.create(), bigrat.fromInteger(m[1]), a[1][0] + +k);
					bigrat.mul(p, p, pi);
					bigrat.mul(p, p, pj);
					bigrat.mul(p, p, pk);
					bigrat.add(out, out, p);
				}
			}
		}
	}
	else {
		// recursive function?
		alert('unsupported dimension '+d);
	}
	//return out = bigrat.fromInteger(parseInt(result));
	return out;
};

/**
 * Calculates the derivates of a polynumber
 *
 * @param {polyrat} a polynumber to take the derivatives of
 * @returns {Array} array of polyrats, corresponding to the sub-derivatives of the input
 */
polyrat.derivatives = function(a) {
	// MF78 @ 10:00
	return [
//		polyrat.clone(a),
	];
};

/**
 * Calls a function for each non-zero element in the polynumber
 *
 * @param {polyrat} a rational polynumber
 * @param {function} callback function
 */
polyrat.forEachNonZeroElement = function(a, callback) {
	var t = a.slice();
	var d = 0;
	while (typeof t[0] === 'object') {
		t = t[0].slice();
		d++;
	}
	for (var i=d+1; i>0; --i) {
		print(new Array(i).join('[0]'));
		t = eval('(a'+(new Array(i).join('[0]'))+')');
		for (var c in t) {
			for (var j=d+2; j>0; --j) {
				print(t[c]);
			}
		}
	}
	return '';
};

/**
 * Returns a string representation (polynomial format, in ascending order by degree, then alphabetically) -- not yet!
 *
 * @param {polyrat} a rational polynumber to represent as a string
 * @returns {String} string representation of the number
 */
polyrat.str = function(a) {
	var s = '';
	var vars = new alpha.iterator;
	
	var _i = vars.next();
	var _j = vars.next();
	var _k = vars.next();
	
	var d = polyrat.countDimensions(a);
	if (d===0) {
		s += a.toString();
	}
	else if (d===1) {
		for (var i in a[0]) {
			if (!a[0][i]) continue;
			if (s) s += ' ' + (a[0][i]<0?'-':'+') + ' ';
			else if (a[0][i]<0) s += '-';
			var c = Math.abs(a[0][i]);
			var i_power = a[1][0] + +i;
			if (c!==1||(i_power===0)) s += c;
			if (i_power!==0) s += _i + (i_power === 1 ? '' : '<sup>'+i_power+'</sup>');
		}
	}
	else if (d===2) {
		for (var j in a[0]) {
			for (var i in a[0][j]) {
				if (!a[0][j][i]) continue;
				if (s) s += ' ' + (a[0][j][i]<0?'-':'+') + ' ';
				else if (a[0][j][i]<0) s += '-';
				var c = Math.abs(a[0][j][i]);
				var i_power = a[1][1] + +i;
				var j_power = a[1][0] + +j;
				if (c!==1||(j_power===0&&i_power===0)) s += c;
				if (i_power!==0) s += _i + (i_power === 1 ? '' : '<sup>'+i_power+'</sup>');
				if (j_power!==0) s += _j + (j_power === 1 ? '' : '<sup>'+j_power+'</sup>');
			}
		}
	}
	else if (d===3) {
		for (var k in a[0]) {
			for (var j in a[0][k]) {
				for (var i in a[0][k][j]) {
					if (!a[0][k][j][i]) continue;
					if (s) s += ' ' + (a[0][k][j][i]<0?'-':'+') + ' ';
					else if (a[0][k][j][i]<0) s += '-';
					var c = Math.abs(a[0][k][j][i]);
					var i_power = a[1][2] + +i;
					var j_power = a[1][1] + +j;
					var k_power = a[1][0] + +k;
					if (c!==1||(k_power===0&&j_power===0&&i_power===0)) s += c;
					if (i_power!==0) s += _i + (i_power === 1 ? '' : '<sup>'+i_power+'</sup>');
					if (j_power!==0) s += _j + (j_power === 1 ? '' : '<sup>'+j_power+'</sup>');
					if (k_power!==0) s += _k + (k_power === 1 ? '' : '<sup>'+k_power+'</sup>');
				}
			}
		}
	}
	else {
		alert('unsupported dimension '+d);
	}
	if (s==='') s = '0';
	return s;
};


/**
 * Evaluate a polynomial for a certain variable(s)
 *
 * @param {polyrat} a polynumber
 * @returns {String} javascript formula to evaluate the polynomial
 */
polyrat.getJSFormula = function(a) {
	var f = '';
	var d = polyrat.countDimensions(a);
	if (d===0) {
		return '0';
	}
	else if (d===1) {
		for (var i in a[0]) {
			if (!a[0][i]) continue;
			if (f) f += '+';
			f += a[0][i];
			var i_power = a[1][0] + +i;
			if (i_power===0) continue;
			else if (i_power===1) f += '*m[0]';
			else f += '*Math.pow(m[0],' + i_power + ')';
		}
	}
	else if (d===2) {
		for (var j in a[0]) {
			for (var i in a[0][j]) {
				if (!a[0][j][i]) continue;
				if (f) f += '+';
				f += a[0][j][i];
				var i_power = a[1][1] + +i;
				var j_power = a[1][0] + +j;
				if (i_power!==0) {
					if (i_power===1) f += '*m[0]';
					else f += '*Math.pow(m[0],' + i_power + ')';
				}
				if (j_power!==0) {
					if (j_power===1) f += '*m[1]';
					else f += '*Math.pow(m[1],' + j_power + ')';
				}
			}
		}
	}
	else if (d===3) {
		for (var k in a[0]) {
			for (var j in a[0][k]) {
				for (var i in a[0][k][j]) {
					if (!a[0][k][j][i]) continue;
					if (f) f += '+';
					f += a[0][k][j][i];
					var i_power = a[1][2] + +i;
					var j_power = a[1][1] + +j;
					var k_power = a[1][0] + +k;
					if (i_power!==0) {
						if (i_power===1) f += '*m[0]';
						else f += '*Math.pow(m[0],' + i_power + ')';
					}
					if (j_power!==0) {
						if (j_power===1) f += '*m[1]';
						else f += '*Math.pow(m[1],' + j_power + ')';
					}
					if (k_power!==0) {
						if (k_power===1) f += '*m[2]';
						else f += '*Math.pow(m[2],' + k_power + ')';
					}
				}
			}
		}
	}
	else {
		alert('unsupported dimension '+d);
	}
	if (f==='') f = '0';
	return f;
};

// this is used in getGLSLFormula as a quick hack, shouldn't actually be here...
String.prototype.repeat = function(n) {return new Array(n+1).join(this);}

/**
 * Evaluate a polynomial for a certain variable(s), modified to work in GLSL (to run on GPU)
 *
 * @param {polyrat} a polynumber
 * @returns {String} GLSL formula to evaluate the polynomial
 */
polyrat.getGLSLFormula = function(a) {
	var f = '';
	var d = polyrat.countDimensions(a);
	if (d===0) {
		return '0.0';
	}
	else if (d===1) {
		for (var i in a[0]) {
			if (!a[0][i]) continue;
			if (f) f += '+';
			f += a[0][i]+'.0';
			var i_power = a[1][0] + +i;
			if (i_power===0) continue;
			else if (i_power===1) f += '*m_0';
			else if (i_power>1) f += ('*m_0').repeat(i_power);
			else f += '*pow(1.0'+('*m_0').repeat(Math.abs(i_power))+',-1.0)';
		}
	}
	else if (d===2) {
		for (var j in a[0]) {
			for (var i in a[0][j]) {
				if (!a[0][j][i]) continue;
				if (f) f += '+';
				f += a[0][j][i]+'.0';
				var i_power = a[1][1] + +i;
				var j_power = a[1][0] + +j;
				if (i_power!==0) {
					if (i_power===1) f += '*m_0';
					else if (i_power>1) f += ('*m_0').repeat(i_power);
					else f += '*pow(1.0'+('*m_0').repeat(Math.abs(i_power))+',-1.0)';
				}
				if (j_power!==0) {
					if (j_power===1) f += '*m_1';
					else if (j_power>1) f += ('*m_1').repeat(j_power);
					else f += '*pow(1.0'+('*m_1').repeat(Math.abs(j_power))+',-1.0)';
				}
			}
		}
	}
	else {
		alert('unsupported dimension '+d);
	}
	if (f==='') f = '0.0';
	return f;
};

/**
 * Returns a string representation (JSON)
 *
 * @param {polyrat} a rational polynumber to represent as a string
 * @returns {String} JSON representation of the number
 */
polyrat.toJSON = function(a) {
	return JSON.stringify(a);
};

/**
 * Creates a polynumber from it's JSON representation
 *
 * @param {String} JSON representation of the number
 * @returns {polyrat} a rational polynumber
 */
polyrat.fromJSON = function(a) {
	return JSON.parse(a);
};

/**
 * Normalize a polynumber
 *
 * @param {polyrat} out the receiving number
 * @param {polyrat} a number to normalize
 * @returns {polyrat} out
 */
polyrat.normalize = function(out, a) {
	return out = a;
};

/**
 * Adds two polyrats
 *
 * @param {polyrat} out the receiving number
 * @param {polyrat} a the first operand
 * @param {polyrat} b the second operand
 * @returns {polyrat} out
 */
polyrat.add = function(out, a, b) {
	var 	a_dimensions = polyrat.countDimensions(a),
			b_dimensions = polyrat.countDimensions(b);
	if (a[1][i]!==b[1][i]) {
		alert('adding polyrats only works if the offsets are the same (for now)');
	}
	if (a_dimensions===1&&b_dimensions===1) {
		for (var i in a[0]) {
			out[0][i] = typeof b[0][i] === 'undefined' ? a[0][i] : a[0][i] + b[0][i];
		}
		for (var i in b[0]) {
			if (typeof a[0][i] === 'undefined') out[0][i] = b[0][i];
		}
		for (var i in out[0]) {
			if (typeof a[0][i] === 'undefined' && typeof b[0][i] === 'undefined') out[0][i] = null;
		}
	}
	else {
		alert('unsupported dimension '+a_dimensions);
	}
	var i=a_dimensions;
	while (i--) out[1][i] = a[1][i];
	return out;
};

/**
 * Subtracts two polyrats
 *
 * @param {polyrat} out the receiving number
 * @param {polyrat} a the first operand
 * @param {polyrat} b the second operand
 * @returns {polyrat} out
 */
polyrat.subtract = function(out, a, b) {
	return out;
};

/**
 * Alias for {@link polyrat.subtract}
 * @function
 */
polyrat.sub = polyrat.subtract;

/**
 * Multiplies two polyrats
 *
 * @param {polyrat} out the receiving number
 * @param {polyrat} a the first operand
 * @param {polyrat} b the second operand
 * @returns {polyrat} out
 */
polyrat.multiply = function(out, a, b) {
	return out;
};

/**
 * Alias for {@link polyrat.multiply}
 * @function
 */
polyrat.mul = polyrat.multiply;

/**
 * Divides two polyrats
 *
 * @param {polyrat} out the receiving number
 * @param {polyrat} a the first operand
 * @param {polyrat} b the second operand
 * @returns {polyrat} out
 */
polyrat.divide = function(out, a, b) {
	return out;
};

/**
 * Alias for {@link polyrat.divide}
 * @function
 */
polyrat.div = polyrat.divide;

/**
 * Returns true when the first polyrat is equal to the second
 *
 * @param {polyrat} a the first operand
 * @param {polyrat} b the second operand
 * @returns {Bool} true when the two polyrats are equal
 */
polyrat.equals = function(a, b) {
	return a[0] === b[0] && a[1] === b[1];
};

/**
 * Count the number of dimensions of an array
 *
 * @param {polyrat} a number to count the dimensions of
 * @returns {Integer} number of dimensions
 */
polyrat.countDimensions = function(a) {
	return typeof a[0] === 'object' ? polyrat._countDimensions(a[0], 1) : 0;
};

/**
 * Count the number of dimensions of an array recursively
 *
 * @param {polyrat} an array to count the dimensions of
 * @param {polyrat} c (counter used during recursion)
 * @returns {Integer} number of dimensions
 */
polyrat._countDimensions = function(a, c) {
	return typeof a[0] === 'object' ? polyrat._countDimensions(a[0], ++c) : c;
};

/**
 * Zero, the additive identity
 *
 * @property ZERO
 * @type polyrat
 * @static
 * @final
 */
polyrat.ZERO = polyrat.fromValues([0]);

/**
 * One, the multiplicative identity
 *
 * @property IDENTITY
 * @type polyrat
 * @static
 * @final
 */
polyrat.IDENTITY = polyrat.fromValues([1]);

/**
 * Alias for {@link polyrat.IDENTITY}
 * @static
 */
polyrat.ONE = polyrat.IDENTITY;

if(typeof(exports) !== 'undefined') {
	exports.polyrat = polyrat;
}
