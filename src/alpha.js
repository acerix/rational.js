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
