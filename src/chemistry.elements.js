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
 * @class Chemistry Elements
 * @name elements
 */
var elements = [];

elements[0] = {
    name: 'nothing',
    symbol: '0',
    mass: 0,
    group: 0,
    period: 0
};

elements[1] = {
    name: 'Hydrogen',
    symbol: 'H',
    mass: 1.00794,
    group: 1,
    period: 1
};

elements[2] = {
    name: 'Helium',
    symbol: 'He',
    mass: 4.002602,
    group: 18,
    period: 1
};

elements[3] = {
    name: 'Lithium',
    symbol: 'Li',
    mass: 6.941,
    group: 1,
    period: 2
};

elements[4] = {
    name: 'Beryllium',
    symbol: 'Be',
    mass: 9.012182,
    group: 1,
    period: 2
};

elements[5] = {
    name: 'Boron',
    symbol: 'B',
    mass: 10.811,
    group: 13,
    period: 2
};

elements[6] = {
    name: 'Carbon',
    symbol: 'C',
    mass: 12.0107,
    group: 14,
    period: 2
};

elements[7] = {
    name: 'Nitrogen',
    symbol: 'N',
    mass: 14.0067,
    group: 15,
    period: 2
};

elements[8] = {
    name: 'Oxygen',
    symbol: 'O',
    mass: 15.9994,
    group: 16,
    period: 2
};

elements[9] = {
    name: 'Fluorine',
    symbol: 'F',
    mass: 18.9984032,
    group: 17,
    period: 2
};

elements[10] = {
    name: 'Neon',
    symbol: 'Ne',
    mass: 20.1797,
    group: 18,
    period: 2
};

elements[11] = {
    name: 'Sodium',
    symbol: 'Na',
    mass: 22.98976928,
    group: 1,
    period: 3
};

elements[12] = {
    name: 'Magnesium',
    symbol: 'Mg',
    mass: 24.3050,
    group: 2,
    period: 3
};

elements[13] = {
    name: 'Aluminium',
    symbol: 'Al',
    mass: 26.9815386,
    group: 13,
    period: 3
};

elements[14] = {
    name: 'Silicon',
    symbol: 'Si',
    mass: 28.0855,
    group: 14,
    period: 3
};

elements[15] = {
    name: 'Phosphorus',
    symbol: 'P',
    mass: 30.973762,
    group: 15,
    period: 3
};

elements[16] = {
    name: 'Sulfur',
    symbol: 'S',
    mass: 32.065,
    group: 16,
    period: 3
};

elements[17] = {
    name: 'Chlorine',
    symbol: 'Cl',
    mass: 35.453,
    group: 17,
    period: 3
};

elements[18] = {
    name: 'Argon',
    symbol: 'Ar',
    mass: 39.948,
    group: 18,
    period: 3
};

elements[19] = {
    name: 'Potassium',
    symbol: 'K',
    mass: 39.0983,
    group: 1,
    period: 4
};

elements[20] = {
    name: 'Calcium',
    symbol: 'Ca',
    mass: 40.078,
    group: 4,
    period: 2
};

elements[21] = {
    name: 'Scandium',
    symbol: 'Sc',
    mass: 44.955912,
    group: 3,
    period: 4
};

elements[22] = {
    name: 'Titanium',
    symbol: 'Ti',
    mass: 47.867,
    group: 4,
    period: 4
};

elements[23] = {
    name: 'Vanadium',
    symbol: 'V',
    mass: 50.9415,
    group: 5,
    period: 4
};

elements[24] = {
    name: 'Chromium',
    symbol: 'Cr',
    mass: 51.9961,
    group: 6,
    period: 4
};

elements[25] = {
    name: 'Manganese',
    symbol: 'Mn',
    mass: 54.938045,
    group: 7,
    period: 4
};

elements[26] = {
    name: 'Iron',
    symbol: 'Fe',
    mass: 55.845,
    group: 8,
    period: 4
};

elements[27] = {
    name: 'Cobalt',
    symbol: 'Co',
    mass: 58.933195,
    group: 9,
    period: 4
};

elements[28] = {
    name: 'Nickel',
    symbol: 'Ni',
    mass: 58.6934,
    group: 10,
    period: 4
};

elements[29] = {
    name: 'Copper',
    symbol: 'Cu',
    mass: 63.546,
    group: 11,
    period: 4
};

elements[30] = {
    name: 'Zinc',
    symbol: 'Zn',
    mass: 65.39,
    group: 12,
    period: 4
};

elements[31] = {
    name: 'Gallium',
    symbol: 'Ga',
    mass: 69.723,
    group: 13,
    period: 4
};

elements[32] = {
    name: 'Germanium',
    symbol: 'Ge',
    mass: 72.64,
    group: 14,
    period: 4
};

elements[33] = {
    name: 'Arsenic',
    symbol: 'As',
    mass: 74.92160,
    group: 15,
    period: 4
};

elements[34] = {
    name: 'Selenium',
    symbol: 'Se',
    mass: 78.96,
    group: 16,
    period: 4
};

elements[35] = {
    name: 'Bromine',
    symbol: 'Br',
    mass: 79.904,
    group: 17,
    period: 4
};

elements[36] = {
    name: 'Krypton',
    symbol: 'Kr',
    mass: 83.798,
    group: 18,
    period: 4
};

elements[37] = {
    name: 'Rubidium',
    symbol: 'Rb',
    mass: 85.4678,
    group: 1,
    period: 5
};

elements[38] = {
    name: 'Strontium',
    symbol: 'Sr',
    mass: 87.62,
    group: 2,
    period: 5
};

elements[39] = {
    name: 'Yttrium',
    symbol: 'Y',
    mass: 88.90585,
    group: 3,
    period: 5
};

elements[40] = {
    name: 'Zirconium',
    symbol: 'Zr',
    mass: 91.224,
    group: 4,
    period: 5
};

elements[41] = {
    name: 'Niobium',
    symbol: 'Nb',
    mass: 92.90638,
    group: 5,
    period: 5
};

elements[42] = {
    name: 'Molybdenum',
    symbol: 'Mb',
    mass: 95.94,
    group: 6,
    period: 5
};

elements[43] = {
    name: 'Technetium',
    symbol: 'Tc',
    mass: 97.9072,
    group: 7,
    period: 5
};

elements[44] = {
    name: 'Ruthenium',
    symbol: 'Ru',
    mass: 101.07,
    group: 8,
    period: 5
};

elements[45] = {
    name: 'Rhodium',
    symbol: 'Rh',
    mass: 102.90550,
    group: 9,
    period: 5
};

elements[46] = {
    name: 'Palladium',
    symbol: 'Pd',
    mass: 106.42,
    group: 10,
    period: 5
};

elements[47] = {
    name: 'Silver',
    symbol: 'Ag',
    mass: 107.8682,
    group: 11,
    period: 5
};

elements[48] = {
    name: 'Cadmium',
    symbol: 'Cd',
    mass: 112.411,
    group: 12,
    period: 5
};

elements[49] = {
    name: 'Indium',
    symbol: 'In',
    mass: 114.818,
    group: 13,
    period: 5
};

elements[50] = {
    name: 'Tin',
    symbol: 'Sn',
    mass: 118.710,
    group: 14,
    period: 5
};

elements[51] = {
    name: 'Antimony',
    symbol: 'Sb',
    mass: 121.760,
    group: 15,
    period: 5
};

elements[52] = {
    name: 'Tellurium',
    symbol: 'Te',
    mass: 127.60,
    group: 16,
    period: 5
};

elements[53] = {
    name: 'Iodine',
    symbol: 'I',
    mass: 126.90447,
    group: 17,
    period: 5
};

elements[54] = {
    name: 'Xenon',
    symbol: 'Xe',
    mass: 131.293,
    group: 18,
    period: 5
};

elements[55] = {
    name: 'Caesium',
    symbol: 'Cs',
    mass: 132.9054519,
    group: 1,
    period: 6
};

elements[56] = {
    name: 'Barium',
    symbol: 'Ba',
    mass: 137.327,
    group: 2,
    period: 6
};

elements[57] = {
    name: 'Lanthanum',
    symbol: 'La',
    mass: 138.90547,
    group: -1,
    period: 6
};

elements[58] = {
    name: 'Cerium',
    symbol: 'Ce',
    mass: 140.116,
    group: -1,
    period: 6
};

elements[59] = {
    name: 'Praseodymium',
    symbol: 'Pr',
    mass: 140.90765,
    group: -1,
    period: 6
};

elements[60] = {
    name: 'Neodymium',
    symbol: 'Nd',
    mass: 144.242,
    group: -1,
    period: 6
};

elements[61] = {
    name: 'Promethium',
    symbol: 'Pm',
    mass: 144.9127,
    group: -1,
    period: 6
};

elements[62] = {
    name: 'Samarium',
    symbol: 'Sm',
    mass: 150.36,
    group: -1,
    period: 6
};

elements[63] = {
    name: 'Europium',
    symbol: 'Eu',
    mass: 151.964,
    group: -1,
    period: 6
};

elements[64] = {
    name: 'Gadolinium',
    symbol: 'Gd',
    mass: 157.25,
    group: -1,
    period: 6
};

elements[65] = {
    name: 'Terbium',
    symbol: 'Tb',
    mass: 158.92535,
    group: -1,
    period: 6
};

elements[66] = {
    name: 'Dysprosium',
    symbol: 'Dy',
    mass: 162.500,
    group: -1,
    period: 6
};

elements[67] = {
    name: 'Holmium',
    symbol: 'Ho',
    mass: 164.93032,
    group: -1,
    period: 6
};

elements[68] = {
    name: 'Erbium',
    symbol: 'Er',
    mass: 167.259,
    group: -1,
    period: 6
};

elements[69] = {
    name: 'Thulium',
    symbol: 'Tm',
    mass: 168.93421,
    group: -1,
    period: 6
};

elements[70] = {
    name: 'Ytterbium',
    symbol: 'Yb',
    mass: 173.04,
    group: -1,
    period: 6
};

elements[71] = {
    name: 'Lutetium',
    symbol: 'Lu',
    mass: 174.967,
    group: 3,
    period: 6
};

elements[72] = {
    name: 'Hafnium',
    symbol: 'Hf',
    mass: 178.49,
    group: 4,
    period: 6
};

elements[73] = {
    name: 'Tantalum',
    symbol: 'Ta',
    mass: 180.94788,
    group: 5,
    period: 6
};

elements[74] = {
    name: 'Tungsten',
    symbol: 'W',
    mass: 183.84,
    group: 6,
    period: 6
};

elements[75] = {
    name: 'Rhenium',
    symbol: 'Re',
    mass: 186.207,
    group: 7,
    period: 6
};

elements[76] = {
    name: 'Osmium',
    symbol: 'Os',
    mass: 190.23,
    group: 8,
    period: 6
};

elements[77] = {
    name: 'Iridium',
    symbol: 'Ir',
    mass: 192.217,
    group: 9,
    period: 6
};

elements[78] = {
    name: 'Platinum',
    symbol: 'Pt',
    mass: 195.084,
    group: 10,
    period: 6
};

elements[79] = {
    name: 'Gold',
    symbol: 'Au',
    mass: 196.966569,
    group: 11,
    period: 6
};

elements[80] = {
    name: 'Mercury',
    symbol: 'Hg',
    mass: 200.59,
    group: 12,
    period: 6
};

elements[81] = {
    name: 'Thallium',
    symbol: 'Tl',
    mass: 204.3833,
    group: 13,
    period: 6
};

elements[82] = {
    name: 'Lead',
    symbol: 'Pb',
    mass: 207.2,
    group: 14,
    period: 6
};

elements[83] = {
    name: 'Bismuth',
    symbol: 'Bi',
    mass: 208.98040,
    group: 15,
    period: 6
};

elements[84] = {
    name: 'Polonium',
    symbol: 'Po',
    mass: 208.9824,
    group: 16,
    period: 6
};

elements[85] = {
    name: 'Astatine',
    symbol: 'At',
    mass: 209.9871,
    group: 17,
    period: 6
};

elements[86] = {
    name: 'Radon',
    symbol: 'Rn',
    mass: 222.0176,
    group: 18,
    period: 6
};

elements[87] = {
    name: 'Francium',
    symbol: 'Fr',
    mass: 223.0197,
    group: 1,
    period: 7
};

elements[88] = {
    name: 'Radium',
    symbol: 'Ra',
    mass: 226.0254,
    group: 2,
    period: 7
};

elements[89] = {
    name: 'Actinium',
    symbol: 'Ac',
    mass: 227.027,
    group: -1,
    period: 7
};

elements[90] = {
    name: 'Thorium',
    symbol: 'Th',
    mass: 232.03806,
    group: -1,
    period: 7
};

elements[91] = {
    name: 'Protactinium',
    symbol: 'Pa',
    mass: 231.03588,
    group: -1,
    period: 7
};

elements[92] = {
    name: 'Uranium',
    symbol: 'U',
    mass: 238.02891,
    group: -1,
    period: 7
};

elements[93] = {
    name: 'Neptunium',
    symbol: 'Np',
    mass: 237.0482,
    group: -1,
    period: 7
};

elements[94] = {
    name: 'Plutonium',
    symbol: 'Pu',
    mass: 244.0642,
    group: -1,
    period: 7
};

elements[95] = {
    name: 'Americium',
    symbol: 'Am',
    mass: 243.0614,
    group: -1,
    period: 7
};

elements[96] = {
    name: 'Curium',
    symbol: 'Cm',
    mass: 247.0704,
    group: -1,
    period: 7
};

elements[97] = {
    name: 'Berkelium',
    symbol: 'Bk',
    mass: 247.0703,
    group: -1,
    period: 7
};

elements[98] = {
    name: 'Californium',
    symbol: 'Cf',
    mass: 251.0796,
    group: -1,
    period: 7
};

elements[99] = {
    name: 'Einsteinium',
    symbol: 'Es',
    mass: 252.0830,
    group: -1,
    period: 7
};

elements[100] = {
    name: 'Fermium',
    symbol: 'Fm',
    mass: 257.0951,
    group: -1,
    period: 7
};

elements[101] = {
    name: 'Mendelevium',
    symbol: 'Md',
    mass: 258.0984,
    group: -1,
    period: 7
};

elements[102] = {
    name: 'Nobelium',
    symbol: 'No',
    mass: 259.1010,
    group: -1,
    period: 7
};

elements[103] = {
    name: 'Lawrencium',
    symbol: 'Lr',
    mass: 262.1097,
    group: 3,
    period: 7
};

elements[104] = {
    name: 'Rutherfordium',
    symbol: 'Rf',
    mass: 261.1088,
    group: 4,
    period: 7
};

elements[105] = {
    name: 'Dubnium',
    symbol: 'Db',
    mass: 262,
    group: 5,
    period: 7
};

elements[106] = {
    name: 'Seaborgium',
    symbol: 'Sg',
    mass: 266,
    group: 6,
    period: 7
};

elements[107] = {
    name: 'Bohrium',
    symbol: 'Bh',
    mass: 264,
    group: 7,
    period: 7
};

elements[108] = {
    name: 'Hassium',
    symbol: 'Hs',
    mass: 277,
    group: 8,
    period: 7
};

elements[109] = {
    name: 'Meitnerium',
    symbol: 'Mt',
    mass: 268,
    group: 9,
    period: 7
};

elements[110] = {
    name: 'Darmstadtium',
    symbol: 'Ds',
    mass: 271,
    group: 10,
    period: 7
};

elements[111] = {
    name: 'Roentgenium',
    symbol: 'Rg',
    mass: 272,
    group: 11,
    period: 7
};

elements[112] = {
    name: 'Ununbium',
    symbol: 'Uub',
    mass: 285,
    group: 12,
    period: 7
};

elements[113] = {
    name: 'Ununtrium',
    symbol: 'Uut',
    mass: 284,
    group: 13,
    period: 7
};

elements[114] = {
    name: 'Ununquadium',
    symbol: 'Uuq',
    mass: 289,
    group: 14,
    period: 7
};

elements[115] = {
    name: 'Ununpentium',
    symbol: 'Uup',
    mass: 288,
    group: 15,
    period: 7
};

elements[116] = {
    name: 'Ununhexium',
    symbol: 'Uuh',
    mass: 292,
    group: 16,
    period: 7
};

elements[117] = {
    name: 'Ununseptium',
    symbol: 'Uus',
    mass: 293,
    group: 17,
    period: 7
};

elements[118] = {
    name: 'Ununoctium',
    symbol: 'Uuo',
    mass: 294,
    group: 18,
    period: 7
};

if(typeof(exports) !== 'undefined') {
	exports.elements = elements;
}
