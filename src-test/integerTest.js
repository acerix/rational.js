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

integerTest = TestCase("integerTest");

integerTest.prototype.testGcd = function() {
	
	assertEquals(
		7,
		integer.gcd(7, 7)
	);
	
	assertEquals(
		18,
		integer.gcd(360, 666)
	);
	
	assertEquals(
		6,
		integer.gcd(420, 666)
	);
	
	assertEquals(
		5,
		integer.gcd(8123215, 1923865)
	);
	
	assertEquals(
		69,
		integer.gcd(560501559, 132746685)
	);
	
};
