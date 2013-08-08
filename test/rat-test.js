
var vows = require('vows'),
	assert = require('assert');

var rat = require('../src/rat.js').rat;

vows.describe('convert rat{} constants to strings').addBatch({
	
    'rat.str(rat.ZERO)': {
        topic: function () { return rat.str(rat.ZERO) },
        'equals "0"': function (v) {
            assert.equal (v, '0');
        }
    },
    'rat.str(rat.ONE)': {
        topic: function () { return rat.str(rat.ONE) },
        'equals "1"': function (v) {
            assert.equal (v, '1');
        }
    },
    'rat.str(rat.NEGONE)': {
        topic: function () { return rat.str(rat.NEGONE) },
        'equals "-1"': function (v) {
            assert.equal (v, '-1');
        }
    },
    'rat.str(rat.INFINITY)': {
        topic: function () { return rat.str(rat.INFINITY) },
        'equals "1/0"': function (v) {
            assert.equal (v, '1/0');
        }
    },
    'rat.str(rat.INFINULL)': {
        topic: function () { return rat.str(rat.INFINULL) },
        'equals "0/0"': function (v) {
            assert.equal (v, '0/0');
        }
    },
}).export(module);

vows.describe('convert decimal numbers to rat{}').addBatch({
	
    'rat.toDecimal(1/7)': {
        topic: function () { return rat.str(rat.fromDecimal(1/7)) },
        'equals "1/7"': function (v) {
            assert.equal (v, '1/7');
        }
    },
    'rat.toDecimal(1/49)': {
        topic: function () { return rat.str(rat.fromDecimal(1/49)) },
        'equals "1/49"': function (v) {
            assert.equal (v, '1/49');
        }
    },
    'rat.toDecimal(1/98)': {
        topic: function () { return rat.str(rat.fromDecimal(1/98)) },
        'equals "1/98"': function (v) {
            assert.equal (v, '1/98');
        }
    },
    'rat.toDecimal(1/103)': {
        topic: function () { return rat.str(rat.fromDecimal(1/103)) },
        'equals "1/103"': function (v) {
            assert.equal (v, '1/103');
        }
    },
    'rat.toDecimal(1/107)': {
        topic: function () { return rat.str(rat.fromDecimal(1/107)) },
        'equals "1/107"': function (v) {
            assert.equal (v, '1/107');
        }
    },
}).export(module);

/*

//need to convert these to vows...

ratTest = TestCase("ratTest");

ratTest.prototype.testNormalize = function() {
	
	var t = 2;
	assertEquals(
		"-3/71",
		rat.str(rat.fromValues(3 * t, -71 * t))
	);
	
	t = -12147;
	assertEquals(
		"11/3",
		rat.str(rat.fromValues(11 * t, 3 * t))
	);
	
	t = 6934546;
	assertEquals(
		"7/9",
		rat.str(rat.fromValues(-7 * t, -9 * t))
	);
	
};

ratTest.prototype.testToDecimal = function() {
	
	assertEquals(
		0,
		rat.toDecimal(rat.ZERO)
	);
	
	assertEquals(
		1,
		rat.toDecimal(rat.ONE)
	);
	
	assertSame(
		Infinity,
		rat.toDecimal(rat.INFINITY)
	);
	
	assertNaN(
		rat.toDecimal(rat.INFINULL)
	);
	
	assertEquals(
		-1/10,
		rat.toDecimal(rat.fromValues(1, -10))
	);
};

ratTest.prototype.testFromDecimal = function() {
	
	var t1 = 1/2;
	assertEquals(
		t1,
		rat.toDecimal(rat.fromDecimal(t1))
	);
	
	t1 = 69/256;
	assertEquals(
		t1,
		rat.toDecimal(rat.fromDecimal(t1))
	);
	
	t1 = 169/256;
	assertEquals(
		t1,
		rat.toDecimal(rat.fromDecimal(t1))
	);
	
	t1 = -420/666;
	assertEquals(
		t1,
		rat.toDecimal(rat.fromDecimal(t1))
	);
	
	t1 = Math.PI;
	assertEquals(
		t1,
		rat.toDecimal(rat.fromDecimal(t1))
	);
	
	t1 = Math.E;
	assertEquals(
		t1,
		rat.toDecimal(rat.fromDecimal(t1))
	);
	
	assertEquals(
		'-1/2',
		rat.str(rat.fromDecimal(-1/2))
	);
	
	assertEquals(
		'-1/101',
		rat.str(rat.fromDecimal(-1/101))
	);
	
	assertEquals(
		'-1/100001',
		rat.str(rat.fromDecimal(1/-100001))
	);
	
	assertEquals(
		'611951/611953',
		rat.str(rat.fromDecimal(611951/611953))
	);
	
	assertEquals(
		'-611953/611951',
		rat.str(rat.fromDecimal(-611953/611951))
	);
	
	
	
	var test_decimal = 100000.000001;
	assertEquals(
		test_decimal,
		rat.toDecimal(rat.fromDecimal(test_decimal))
	);
	
	test_decimal = 420.00000069;
	assertEquals(
		test_decimal,
		rat.toDecimal(rat.fromDecimal(test_decimal))
	);
	
};

ratTest.prototype.testRound = function() {
	var t1 = 92812;
	var t2 = 591562;
	assertEquals(
		Math.round(t1 / t2)
		,rat.round(rat.fromValues(t1, t2))
	);
};

ratTest.prototype.testEquals = function() {
	
	assertTrue(
		rat.equals(
			rat.ONE
			,rat.clone(rat.ONE)
		)
	);
	
	assertFalse(
		rat.equals(
			rat.NEGONE
			,rat.clone(rat.ONE)
		)
	);
	
	assertTrue(
		rat.equals(
			rat.INFINITY
			,rat.fromValues(7, 0)
		)
	);
	
};

ratTest.prototype.testIsGreaterThan = function() {
	
	assertFalse(
		rat.isGreaterThan(
			rat.ONE
			,rat.fromValues(3, 2)
		)
	);
	
	assertTrue(
		rat.isGreaterThan(
			rat.ONE
			,rat.fromValues(-3, 2)
		)
	);
	
	assertTrue(
		rat.isGreaterThan(
			rat.ONE
			,rat.fromValues(2, 3)
		)
	);
	
	assertTrue(
		rat.isGreaterThan(
			rat.ONE
			,rat.fromValues(-2, 3)
		)
	);
	
	assertFalse(
		rat.isGreaterThan(
			rat.NEGONE
			,rat.fromValues(-2, 3)
		)
	);
	
	assertTrue(
		rat.isGreaterThan(
			rat.NEGONE
			,rat.fromValues(-3, 2)
		)
	);
	
	assertFalse(
		rat.isGreaterThan(
			rat.fromValues(2, 3)
			,rat.fromValues(3, 2)
		)
	);
	
	assertFalse(
		rat.isGreaterThan(
			rat.fromValues(5, 7)
			,rat.fromValues(5, 6)
		)
	);
	
};

ratTest.prototype.testIsLessThan = function() {
	
	assertTrue(
		rat.isLessThan(
			rat.ONE
			,rat.fromValues(3, 2)
		)
	);
	
	assertFalse(
		rat.isLessThan(
			rat.ONE
			,rat.fromValues(-3, 2)
		)
	);
	
	assertFalse(
		rat.isLessThan(
			rat.ONE
			,rat.fromValues(2, 3)
		)
	);
	
	assertFalse(
		rat.isLessThan(
			rat.ONE
			,rat.fromValues(-2, 3)
		)
	);
	
	assertTrue(
		rat.isLessThan(
			rat.NEGONE
			,rat.fromValues(-2, 3)
		)
	);
	
	assertFalse(
		rat.isLessThan(
			rat.NEGONE
			,rat.fromValues(-3, 2)
		)
	);
	
	assertTrue(
		rat.isLessThan(
			rat.fromValues(2, 3)
			,rat.fromValues(3, 2)
		)
	);
	
	assertTrue(
		rat.isLessThan(
			rat.fromValues(5, 7)
			,rat.fromValues(5, 6)
		)
	);
	
};

ratTest.prototype.testSqrt = function() {
	var t1 = rat.fromInteger(4);
	var t2 = rat.create();
	return;
	rat.sqrt(t2, t1);
	assertEquals(
		'2',
		rat.str(t2)
	);
	
	t1 = rat.fromInteger(25);
	rat.sqrt(t2, t1);
	assertEquals(
		'5',
		rat.str(t2)
	);
	
	t1 = rat.fromValues(1, 100);
	rat.sqrt(t2, t1);
	assertEquals(
		'1/10',
		rat.str(t2)
	);
	
	t1 = rat.fromInteger(2);
	rat.sqrt(t2, t1);
	
	assertEquals(
		Math.SQRT2,
		rat.toDecimal(t2)
	);
	
	rat.invert(t1, t2);
	assertEquals(
		Math.SQRT1_2 - 0.0000000000000001,
		rat.toDecimal(t1) 
	);
	
	t1 = rat.fromInteger(2);
	rat.pow(t2, t1, -2);
	rat.nthRoot(t1, t2, 2);
	rat.nthRoot(t2, t1, 2);
	
	assertEquals(
		Math.SQRT1_2 - 0.0000000000000001,
		rat.toDecimal(t2)
	);
	
	assertNotEquals(
		Math.SQRT1_2,
		rat.toDecimal(t2)
	);
	
	t1 = rat.fromValues(12167, 729);
	rat.nthRoot(t2, t1, 3);
	assertEquals(
		'23/9',
		rat.str(t2)
	);
	
};

ratTest.prototype.testFromRandom = function() {
	var t1 = rat.fromRandom(rat.create());
	assertEquals(
		rat.toDecimal(t1).toString(),
		rat.toDecimal(t1).toString()
	);
};

ratTest.prototype.testSin = function() {
	var t = rat.create();
	
	rat.sin(t, rat.ZERO);
	assertEquals(
		rat.ZERO,
		t
	);
	
	rat.sin(t, rat.fromValues(1, 2));
	assertEquals(
		'4/5',
		rat.str(t)
	);
	
	rat.sin(t, rat.ONE);
	assertEquals(
		rat.ONE,
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
	
	rat.sin(t, rat.INFINITY);
	assertEquals(
		rat.ZERO,
		t
	);
	
};

ratTest.prototype.testCos = function() {
	var t = rat.create();
	
	rat.cos(t, rat.ZERO);
	assertEquals(
		rat.ONE,
		t
	);
	
	rat.cos(t, rat.fromValues(1, 2));
	assertEquals(
		'3/5',
		rat.str(t)
	);
	
	rat.cos(t, rat.ONE);
	assertEquals(
		rat.ZERO,
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
		rat.ZERO,
		t
	);
	
	rat.cos(t, rat.INFINITY);
	assertEquals(
		'-1',
		rat.str(t)
	);
	
};

ratTest.prototype.testTan = function() {
	var t = rat.create();
	
	rat.tan(t, rat.ZERO);
	assertEquals(
		rat.ZERO,
		t
	);
	
	rat.tan(t, rat.fromValues(1, 2));
	assertEquals(
		'8/5',
		rat.str(t)
	);
	
	rat.tan(t, rat.ONE);
	assertEquals(
		'1/0',
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
		rat.INFINULL,
		t
	);
	
	rat.tan(t, rat.INFINITY);
	assertEquals(
		rat.INFINULL,
		t
	);
	
};

ratTest.prototype.testToEgyptian = function() {
	return;
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

*/
