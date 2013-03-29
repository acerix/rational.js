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
bigratTest = TestCase("bigratTest");

/*
bigratTest.prototype.testToEgyptian = function() {
	assertEquals(
		"1/22 + 1/566 + 1/1120680",
		bigrat.toEgyptian(bigrat.fromValues(17, 360))
	);
};

bigratTest.prototype.testToBabylonian = function() {
	assertEquals(
		"5 * 60^2 + 2 * 60^1 + 3 * 60^0 + 42 * 60^-1",
		bigrat.toBabylonian(bigrat.fromValues(181237, 10))
	);
};
*/

bigratTest.prototype.testToContinuedFraction = function() {
	
	assertEquals(
		[2, 1, 4, 3],
		bigrat.toContinuedFraction(bigrat.fromValues(45, 16))
	);
	
	assertEquals(
		[0, -2, -1, -4, -3],
		bigrat.toContinuedFraction(bigrat.fromValues(-16, 45))
	);
	
};
