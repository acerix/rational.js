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
		[], // multi-dimensional array of coefficients (will be rational numbers, for now integers...)
		[] // array of coefficient offsets (integers)
	];
};

/**
 * Creates a new polynumber initialized with the given array of either integers or rats
 *
 * @param {Array} array of values (of type "rat")
 * @returns {polyrat} a new polynumber
 */
polyrat.fromValues = function(a) {
	var out = polyrat.create();
	out[0] = a.slice();
	out[1] = new Array(polyrat.countDimensions(out));
	for (var i=out[1].length; i--; 1) out[1][i] = 0;
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
 * @param {rat} out the receiving number
 * @param {polyrat} a the polynumber to evaluate 
 * @param {Array} array of values (of type "rat") to plug in to the polynomial
 * @returns {rat} resulting rational number
 */
polyrat.evaluate = function(out, a, m) {
	out[1] = [a.slice()];
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
		polyrat.clone(a),
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
			if (c!=1||(i==0)) s += c;
			if (i!=0) s += _i + (i > 1 ? '<sup>'+i+'</sup>' : '');
		}
	}
	else if (d===2) {
		for (var j in a[0]) {
			for (var i in a[0][j]) {
				if (!a[0][j][i]) continue;
				if (s) s += ' ' + (a[0][j][i]<0?'-':'+') + ' ';
				else if (a[0][j][i]<0) s += '-';
				var c = Math.abs(a[0][j][i]);
				if (c!=1||(j==0&&i==0)) s += c;
				if (i!=0) s += _i + (i > 1 ? '<sup>'+i+'</sup>' : '');
				if (j!=0) s += _j + (j > 1 ? '<sup>'+j+'</sup>' : '');
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
					if (c!=1||(k==0&&j==0&&i==0)) s += c;
					if (i!=0) s += _i + (i > 1 ? '<sup>'+(a[1][2]+ +i)+'</sup>' : '');
					if (j!=0) s += _j + (j > 1 ? '<sup>'+(a[1][1]+ +j)+'</sup>' : '');
					if (k!=0) s += _k + (k > 1 ? '<sup>'+(a[1][0]+ +k)+'</sup>' : '');
				}
			}
		}
	}
	else {
		// recursive function?
		alert('unsupported dimension');
	}
	if (s==='') s = '0';
	return s;
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
	//out[0] = a[0];
	//out[1] = a[1];
	return out = a;
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
