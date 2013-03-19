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
	var self = this;
	//if (numerator.constructor.name==='rational'||numerator.denominator.name==='rational') return rational.divide(numerator, denominator);
	self.a = rat.fromValues(parseInt(numerator), parseInt(denominator));
}

/**
 * Expresses the rational in a string as "numerator/denominator"
 *
 * @returns {String} numerator/denominator
 */
rational.toString = function() {
	return rat.str(self.a);
};

/**
 * Inverts a rational
 *
 * @returns {rational} out
 */
rational.invert = function() {
	return rat.invert(self.a);
};

/**
 * Alias for {@link rational.invert}
 * @function
 */
rational.reciprocal = rational.invert;

/**
 * Add
 *
 * @param {rational} b the second operand
 * @returns {rational} out
 */
rational.add = function(b) {
	return rat.add(rat.create(), self.a, b);
};

/**
 * Alias for {@link rational.add}
 * @function
 */
rational.plus = rational.add;

/**
 * Subtract
 *
 * @param {rat} b the second operand
 * @returns {rat} out
 */
rational.subtract = function(b) {
	return rat.subtract(rat.create(), self.a, b);
};

/**
 * Alias for {@link rational.subtract}
 * @function
 */
rational.sub = rational.subtract;

/**
 * Alias for {@link rational.sub}
 * @function
 */
rational.minus = rational.sub;

/**
 * Multiplies two rationals
 *
 * @param {rational} b the second operand
 * @returns {rat} out
 */
rational.multiply = function(b) {
	return rat.multiply(rat.create(), self.a, b);
};

/**
 * Alias for {@link rational.multiply}
 * @function
 */
rational.mul = rational.multiply;

/**
 * Alias for {@link rational.multiply}
 * @function
 */
rational.times = rational.multiply;

/**
 * Mediant of two rationals
 *
 * @param {rat} b the second operand
 * @returns {rat} out the sum of the numerators divided by the sum of the denominators
 */
rational.mediant = function(b) {
	return rat.mediant(rat.create(), self.a, b);
};

/**
 * Divides two rationals
 *
 * @param {rational} b the second operand
 * @returns {rational} out
 */
rational.divide = function(b) {
	return rat.divide(rat.create(), self.a, b);
};

/**
 * Alias for {@link rational.divide}
 * @function
 */
rational.div = rational.divide;

/**
 * Alias for {@link rational.divide}
 * @function
 */
rational.divided_by = rational.divide;
