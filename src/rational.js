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
