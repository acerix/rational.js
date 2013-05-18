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
 * Fine-structure constant (α), according to CODATA 2011
 *
 * @property FINESTRUCTURE
 * @type bigrat
 * @static
 * @final
 */
physics.FINESTRUCTURE = bigrat.fromValues(30223, 4141639);

/**
 * Alias for {@link physics.FINESTRUCTURE}
 * @type bigrat
 * @static
 * @final
 */
physics.a = physics.FINESTRUCTURE;

/**
 * Approximately the fine-structure constant, generated mathematically from a limit
 *
 * @property FINESTRUCTURE_ALT
 * @type bigrat
 * @static
 * @final
 */
physics.FINESTRUCTURE_ALT = bigrat.fromValues(13355891, 1830237867);

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
 * @type bigrat
 * @static
 * @final
 */
physics.h = physics.PLANK;

/**
 * Reduced Planck's constant (h / 2π)
 *
 * @property HBAR
 * @type bigrat
 * @static
 * @final
 */
physics.hBAR = bigrat.fromValues(1054571726, 1e43);

/**
 * Gravitational constant (G) in m³ / kg s²
 *
 * @property GRAVITATIONAL
 * @type bigrat
 * @static
 * @final
 */
physics.GRAVITATIONAL = bigrat.fromValues(667384, 1e16);

/**
 * Alias for {@link physics.GRAVITATIONAL}
 * @type bigrat
 * @static
 * @final
 */
physics.G = physics.GRAVITATIONAL;

/**
 * The speed of light in vacuum (c) in m / s
 *
 * @property SPEEDOFLIGHT
 * @type bigrat
 * @static
 * @final
 */
physics.SPEEDOFLIGHT = bigrat.fromInteger(299792458);

/**
 * Alias for {@link physics.SPEEDOFLIGHT}
 * @type bigrat
 * @static
 * @final
 */
physics.c = physics.SPEEDOFLIGHT;

goog.exportSymbol('physics', physics);
