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
 * @class Alpha to Omega
 * @name alpha
 */
var alpha = {};

/**
 * List of some distinct looking greek letters for use in polynomials
 *
 * @property GREEK
 * @type Array
 * @static
 * @final
 */
alpha.GREEK = 'αβγδμπρςτφχψωΘΦΩ'.split('');

/**
 * Returns the next consecutive greek letter from the list
 *
 * @returns {String} greek letter
 */
alpha.iterator = function() {
	this.i = 0;
	this.next = function() {
		return this.i < alpha.GREEK.length ? alpha.GREEK[this.i++] : '?';
	}
};
