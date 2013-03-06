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

ratTest = TestCase("ratTest");

ratTest.prototype.testStr = function() {
	
	assertEquals(
		"0",
		rat.str(RAT_ZERO)
	);
	
	assertEquals(
		"1",
		rat.str(RAT_ONE)
	);
	
	assertEquals(
		"1/0",
		rat.str(RAT_INFINITY)
	);
	
	assertEquals(
		"0/0",
		rat.str(RAT_INFINULL)
	);
	
	assertEquals(
		"-1/6",
		rat.str(rat.fromValues(-1, 6))
	);
	
	var t = 2734593;
	assertEquals(
		"-1/72",
		rat.str(rat.fromValues(-t, 72 * t))
	);
};

ratTest.prototype.testToDecimal = function() {
	
	assertEquals(
		0,
		rat.toDecimal(RAT_ZERO)
	);
	
	assertEquals(
		1,
		rat.toDecimal(RAT_ONE)
	);
	
	assertSame(
		Infinity,
		rat.toDecimal(RAT_INFINITY)
	);
	
	assertNotNaN(
		rat.toDecimal(RAT_INFINITY)
	);
	
	assertNaN(
		rat.toDecimal(RAT_INFINULL)
	);
	
	assertNotNull(
		rat.toDecimal(RAT_INFINULL)
	);
	
	assertEquals(
		-1/10,
		rat.toDecimal(rat.fromValues(1, -10))
	);
};

ratTest.prototype.testFromDecimal = function() {
	var t1 = 69/256;
	assertEquals(
		t1,
		rat.toDecimal(rat.fromDecimal(t1))
	);
	
	/*
	// this is expected to fail until this is more accurate
	t1 = 169/1256;
	assertEquals(
		t1,
		rat.toDecimal(rat.fromDecimal(t1))
	);
	*/
};

ratTest.prototype.testRound = function() {
	var t1 = 92812;
	var t2 = 591562;
	assertEquals(
		Math.round(t1 / t2)
		,rat.round(rat.fromValues(t1, t2))
	);
};

ratTest.prototype.testFromRandom = function() {
	var t1 = rat.fromRandom();
	assertEquals(
		rat.toDecimal(t1).toString(),
		rat.toDecimal(t1).toString()
	);
};

ratTest.prototype.testSin = function() {
	var t = rat.create();
	
	rat.sin(t, RAT_ZERO);
	assertEquals(
		RAT_ZERO,
		t
	);
	
	rat.sin(t, rat.fromValues(1, 2));
	assertEquals(
		'4/5',
		rat.str(t)
	);
	
	rat.sin(t, RAT_ONE);
	assertEquals(
		RAT_ONE,
		t
	);
	
	rat.sin(t, rat.fromInteger(2));
	assertEquals(
		'4/5',
		rat.str(t)
	);
	
	rat.sin(t, rat.fromInteger(3));
	assertEquals(
		'3/5',
		rat.str(t)
	);
	
	rat.sin(t, rat.fromInteger(-1));
	assertEquals(
		'-1',
		rat.str(t)
	);
	
	rat.sin(t, RAT_INFINITY);
	assertEquals(
		RAT_ZERO,
		t
	);
	
};

ratTest.prototype.testCos = function() {
	var t = rat.create();
	
	rat.cos(t, RAT_ZERO);
	assertEquals(
		RAT_ONE,
		t
	);
	
	rat.cos(t, rat.fromValues(1, 2));
	assertEquals(
		'3/5',
		rat.str(t)
	);
	
	rat.cos(t, RAT_ONE);
	assertEquals(
		RAT_ZERO,
		t
	);
	
	rat.cos(t, rat.fromInteger(2));
	assertEquals(
		'-3/5',
		rat.str(t)
	);
	
	rat.cos(t, rat.fromInteger(3));
	assertEquals(
		'-4/5',
		rat.str(t)
	);
	
	rat.cos(t, rat.fromInteger(-1));
	assertEquals(
		RAT_ZERO,
		t
	);
	
	rat.cos(t, RAT_INFINITY);
	assertEquals(
		'-1',
		rat.str(t)
	);
	
};

ratTest.prototype.testTan = function() {
	var t = rat.create();
	
	rat.tan(t, RAT_ZERO);
	assertEquals(
		RAT_ZERO,
		t
	);
	
	rat.tan(t, rat.fromValues(1, 2));
	assertEquals(
		'8/5',
		rat.str(t)
	);
	
	rat.tan(t, RAT_ONE);
	assertEquals(
		'4/0',
		rat.str(t)
	);
	
	rat.tan(t, rat.fromInteger(2));
	assertEquals(
		'-4/5',
		rat.str(t)
	);
	
	rat.tan(t, rat.fromInteger(3));
	assertEquals(
		'-3/10',
		rat.str(t)
	);
	
	rat.tan(t, rat.fromInteger(-1));
	assertEquals(
		RAT_INFINULL,
		t
	);
	
	rat.tan(t, RAT_INFINITY);
	assertEquals(
		RAT_INFINULL,
		t
	);
	
};

ratTest.prototype.testToEgyptian = function() {
	assertEquals(
		"1/22 + 1/566 + 1/1120680",
		rat.toEgyptian(rat.fromValues(17, 360))
	);
};

ratTest.prototype.testToBabylonian = function() {
	assertEquals(
		"5 * 60^2 + 2 * 60^1 + 3 * 60^0 + 42 * 60^-1",
		rat.toBabylonian(rat.fromValues(181237, 10))
	);
};

