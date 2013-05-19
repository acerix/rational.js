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
 * @class Chemistry
 * @name chemistry
 */
var chemistry = {};

/**
 * Returns the quantum numbers of the nth electron, starting at n = 0
 *
 * @param {Integer} n the number of electrons before this one
 * @returns {Array} [n, l, m_l, m_s]
 */
chemistry.quantum_numbers_of_atoms_electron = function(n) {
	switch (n) {
		
		// 1s
		case 0:		return [1, 0, +0, +1/2];
		case 1:		return [1, 0, +0, -1/2]; // He
		
		// 2s
		case 2:		return [2, 0, +0, +1/2];
		case 3:		return [2, 0, +0, -1/2];
		
		// 2p
		case 4:		return [2, 1, +0, +1/2];
		case 5:		return [2, 1, +1, +1/2];
		case 6:		return [2, 1, -1, +1/2];
		case 7:		return [2, 1, +0, -1/2];
		case 8:		return [2, 1, +1, -1/2];
		case 9:		return [2, 1, -1, -1/2]; // Ne
		
		// 3s
		case 10:	return [3, 0, +0, +1/2];
		case 11:	return [3, 0, +0, -1/2];
		
		// 3p
		case 12:	return [3, 1, +0, +1/2];
		case 13:	return [3, 1, +1, +1/2];
		case 14:	return [3, 1, -1, +1/2];
		case 15:	return [3, 1, +0, -1/2];
		case 16:	return [3, 1, +1, -1/2];
		case 17:	return [3, 1, -1, -1/2]; // Ar
		
		// 3d
		case 18:	return [3, 2, +0, +1/2];
		case 19:	return [3, 2, +1, +1/2];
		case 20:	return [3, 2, -1, +1/2];
		case 21:	return [3, 2, +2, +1/2];
		case 22:	return [3, 2, -2, +1/2];
		case 23:	return [3, 2, +0, -1/2];
		case 24:	return [3, 2, +1, -1/2];
		case 25:	return [3, 2, -1, -1/2];
		case 26:	return [3, 2, +2, -1/2];
		case 27:	return [3, 2, -2, -1/2];
		
		// 4s
		case 28:	return [4, 0, +0, +1/2];
		case 29:	return [4, 0, +0, -1/2];
		
		// 4p
		case 30:	return [4, 1, +0, +1/2];
		case 31:	return [4, 1, +1, +1/2];
		case 32:	return [4, 1, -1, +1/2];
		case 33:	return [4, 1, +0, -1/2];
		case 34:	return [4, 1, +1, -1/2];
		case 35:	return [4, 1, -1, -1/2]; // Kr
		
		// 5s
		case 36:	return [5, 0, +0, +1/2];
		case 37:	return [5, 0, +0, -1/2];
		
		// 4d
		case 38:	return [4, 2, +0, +1/2];
		case 39:	return [4, 2, +1, +1/2];
		case 40:	return [4, 2, -1, +1/2];
		case 41:	return [4, 2, +2, +1/2];
		case 42:	return [4, 2, -2, +1/2];
		case 43:	return [4, 2, +0, -1/2];
		case 44:	return [4, 2, +1, -1/2];
		case 45:	return [4, 2, -1, -1/2];
		case 46:	return [4, 2, +2, -1/2];
		case 47:	return [4, 2, -2, -1/2];
		
		// 5p
		case 48:	return [5, 1, +0, +1/2];
		case 49:	return [5, 1, +1, +1/2];
		case 50:	return [5, 1, -1, +1/2];
		case 51:	return [5, 1, +0, -1/2];
		case 52:	return [5, 1, +1, -1/2];
		case 53:	return [5, 1, -1, -1/2]; // Xe
		
		// 4f
		case 54:	return [4, 3, +0, +1/2];
		case 55:	return [4, 3, +1, +1/2];
		case 56:	return [4, 3, -1, +1/2];
		case 57:	return [4, 3, +2, +1/2];
		case 58:	return [4, 3, -2, +1/2];
		case 59:	return [4, 3, +3, +1/2];
		case 60:	return [4, 3, -3, +1/2];
		case 61:	return [4, 3, +0, -1/2];
		case 62:	return [4, 3, +1, -1/2];
		case 63:	return [4, 3, -1, -1/2];
		case 64:	return [4, 3, +2, -1/2];
		case 65:	return [4, 3, -2, -1/2];
		case 66:	return [4, 3, +3, -1/2];
		case 67:	return [4, 3, -3, -1/2];
				
		// 5d
		case 68:	return [5, 2, +0, +1/2];
		case 69:	return [5, 2, +1, +1/2];
		case 70:	return [5, 2, -1, +1/2];
		case 71:	return [5, 2, +2, +1/2];
		case 72:	return [5, 2, -2, +1/2];
		case 73:	return [5, 2, +0, -1/2];
		case 74:	return [5, 2, +1, -1/2];
		case 75:	return [5, 2, -1, -1/2];
		case 76:	return [5, 2, +2, -1/2];
		case 77:	return [5, 2, -2, -1/2];
		
		// 6s
		case 78:	return [6, 0, +0, +1/2];
		case 79:	return [6, 0, +0, -1/2];
		
		// 6p
		case 80:	return [6, 1, +0, +1/2];
		case 81:	return [6, 1, +1, +1/2];
		case 82:	return [6, 1, -1, +1/2];
		case 83:	return [6, 1, +0, -1/2];
		case 84:	return [6, 1, +1, -1/2];
		case 85:	return [6, 1, -1, -1/2]; // Rn
		
		// 5f
		case 86:	return [5, 3, +0, +1/2];
		case 87:	return [5, 3, +1, +1/2];
		case 88:	return [5, 3, -1, +1/2];
		case 89:	return [5, 3, +2, +1/2];
		case 90:	return [5, 3, -2, +1/2];
		case 91:	return [5, 3, +3, +1/2];
		case 92:	return [5, 3, -3, +1/2];
		case 93:	return [5, 3, +0, -1/2];
		case 94:	return [5, 3, +1, -1/2];
		case 95:	return [5, 3, -1, -1/2];
		case 96:	return [5, 3, +2, -1/2];
		case 97:	return [5, 3, -2, -1/2];
		case 98:	return [5, 3, +3, -1/2];
		case 99:	return [5, 3, -3, -1/2];
		
		// 6d
		case 100:	return [6, 2, +0, +1/2];
		case 101:	return [6, 2, +1, +1/2];
		case 102:	return [6, 2, -1, +1/2];
		case 103:	return [6, 2, +2, +1/2];
		case 104:	return [6, 2, -2, +1/2];
		case 105:	return [6, 2, +0, -1/2];
		case 106:	return [6, 2, +1, -1/2];
		case 107:	return [6, 2, -1, -1/2];
		case 108:	return [6, 2, +2, -1/2];
		case 109:	return [6, 2, -2, -1/2];
		
		// 7s
		case 110:	return [7, 0, +0, +1/2];
		case 111:	return [7, 0, +0, -1/2];
		
		// 7p
		case 112:	return [7, 1, +0, +1/2];
		case 113:	return [7, 1, +1, +1/2];
		case 114:	return [7, 1, -1, +1/2];
		case 115:	return [7, 1, +0, -1/2];
		case 116:	return [7, 1, +1, -1/2];
		case 117:	return [7, 1, -1, -1/2]; // Uuo
	
	}
}

if(typeof(exports) !== 'undefined') {
	exports.chemistry = chemistry;
}
