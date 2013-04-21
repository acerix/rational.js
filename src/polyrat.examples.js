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
 * z = x - y
 *
 * @property LINEAR
 * @type polyrat
 * @static
 * @final
 */
polyrat.LINEAR = polyrat.fromValues([
  [0, 1],
  [-1]
]);

/**
 * z = -1 + x^2 + y^2
 *
 * @property CIRCLE
 * @type polyrat
 * @static
 * @final
 */
polyrat.CIRCLE = polyrat.fromValues([
  [-1, 0, 1],
  [0],
  [1]
]);

/**
 * z = 1 + x^2 + y^2
 *
 * @property NIRCLE
 * @type polyrat
 * @static
 * @final
 */
polyrat.NIRCLE = polyrat.fromValues([
  [1, 0, 1],
  [0],
  [1]
]);

/**
 * z = x^2 - y
 *
 * @property PARABOLA
 * @type polyrat
 * @static
 * @final
 */
polyrat.PARABOLA = polyrat.fromValues([
  [0, 0, 1],
  [-1]
]);

/**
 * z = 1/x^2 - y
 *
 * @property PARABOLA_INVERSE
 * @type polyrat
 * @static
 * @final
 */
polyrat.PARABOLA_INVERSE = [
	[
		[1,0,0],
		[0,0,-1]
	],
	[0,-2]
];

/**
 * z = -1 + xy
 *
 * @property HYPERBOLA
 * @type polyrat
 * @static
 * @final
 */
polyrat.HYPERBOLA = polyrat.fromValues([
  [-1],
  [0, 1]
]);

/**
 * z = -1 + x^3 + y^3
 *
 * @property FERMAT
 * @type polyrat
 * @static
 * @final
 */
polyrat.FERMAT = polyrat.fromValues([
  [-1, 0, 0, 1],
  [0],
  [0],
  [1]
]);

/**
 * z = x3 - 3xy + y3
 *
 * @property FOLIUM
 * @type polyrat
 * @static
 * @final
 */
polyrat.FOLIUM = polyrat.fromValues([
  [0, 0, 0, 1],
  [0, -3],
  [0],
  [1]
]);

/**
 * z = -2x^2 + 2y^2 + 2x^2y^2 + x^4 + y^4
 *
 * @property LEMNISCATE
 * @type polyrat
 * @static
 * @final
 */
polyrat.LEMNISCATE = polyrat.fromValues([
  [0, 0, -2, 0, 1],
  [0],
  [2, 0, 2],
  [0],
  [1],
]);

/**
 * z = -xy - x^2 - y^2
 *
 * @property PHI
 * @type polyrat
 * @static
 * @final
 */
polyrat.PHI = polyrat.fromValues([
  [0, 0, -1],
  [0, -1],
  [-1]
]);

/**
 * Jumping Jack polynomial
 *
 * @property JUMPINGJACK
 * @type polyrat
 * @static
 * @final
 */
polyrat.JUMPINGJACK = polyrat.fromValues([
  [-1],
  [0, 48, -64],
  [0, -64]
]);

/**
 * A quartic polynomial
 *
 * @property QUARTIC
 * @type polyrat
 * @static
 * @final
 */
polyrat.QUARTIC = polyrat.fromValues([
  [8, -5, 0, 4, -1],
  [-1]
]);
