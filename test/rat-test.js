
var vows = require('vows'),
    assert = require('assert');

integer = require('../src/integer.js').integer;
rat = require('../src/rat.js').rat;

vows.describe('convert rat{} constants to strings').addBatch({
    'rat.str(rat.ZERO)': {
        topic: function () { return rat.str(rat.ZERO) },
        'strictEquals "0"': function (v) {
            assert.strictEqual (v, '0');
        }
    },
    'rat.str(rat.ONE)': {
        topic: function () { return rat.str(rat.ONE) },
        'strictEquals "1"': function (v) {
            assert.strictEqual (v, '1');
        }
    },
    'rat.str(rat.NEGONE)': {
        topic: function () { return rat.str(rat.NEGONE) },
        'strictEquals "-1"': function (v) {
            assert.strictEqual (v, '-1');
        }
    },
    'rat.str(rat.INFINITY)': {
        topic: function () { return rat.str(rat.INFINITY) },
        'strictEquals "1/0"': function (v) {
            assert.strictEqual (v, '1/0');
        }
    },
    'rat.str(rat.INFINULL)': {
        topic: function () { return rat.str(rat.INFINULL) },
        'strictEquals "0/0"': function (v) {
            assert.strictEqual (v, '0/0');
        }
    },
}).export(module);

vows.describe('convert decimal numbers to rat{}').addBatch({
    'rat.fromDecimal(1/7)': {
        topic: function () { return rat.str(rat.fromDecimal(1/7)) },
        'strictEquals "1/7"': function (v) {
            assert.strictEqual (v, '1/7');
        }
    },
    'rat.fromDecimal(1/49)': {
        topic: function () { return rat.str(rat.fromDecimal(1/49)) },
        'strictEquals "1/49"': function (v) {
            assert.strictEqual (v, '1/49');
        }
    },
    'rat.fromDecimal(1/98)': {
        topic: function () { return rat.str(rat.fromDecimal(1/98)) },
        'strictEquals "1/98"': function (v) {
            assert.strictEqual (v, '1/98');
        }
    },
    'rat.fromDecimal(1/103)': {
        topic: function () { return rat.str(rat.fromDecimal(1/103)) },
        'strictEquals "1/103"': function (v) {
            assert.strictEqual (v, '1/103');
        }
    },
    'rat.fromDecimal(1/107)': {
        topic: function () { return rat.str(rat.fromDecimal(1/107)) },
        'strictEquals "1/107"': function (v) {
            assert.strictEqual (v, '1/107');
        }
    },
    'rat.fromDecimal(31/30)': {
        topic: function () { return rat.str(rat.fromDecimal(31/30)) },
        'strictEquals "31/30"': function (v) {
            assert.strictEqual (v, '31/30');
        }
    },
    'rat.fromDecimal(666/667)': {
        topic: function () { return rat.str(rat.fromDecimal(666/667)) },
        'strictEquals "666/667"': function (v) {
            assert.strictEqual (v, '666/667');
        }
    },
    'rat.fromDecimal(1/67108863)': {
        topic: function () { return rat.str(rat.fromDecimal(1/67108863)) },
        'strictEquals "1/67108863"': function (v) {
            assert.strictEqual (v, '1/67108863');
        }
    },
    'rat.fromDecimal(Math.E)': {
        topic: function () { return rat.toDecimal(rat.fromDecimal(Math.E)) },
        'strictEquals "Math.E"': function (v) {
            assert.strictEqual (v, Math.E);
        }
    },
    'rat.toDecimal(rat.fromDecimal(100000.000001))': {
        topic: function () { return rat.toDecimal(rat.fromDecimal(100000.000001)) },
        'strictEquals 100000.000001': function (v) {
            assert.strictEqual (v, 100000.000001);
        }
    },
    'rat.toDecimal(rat.fromDecimal(.0123456789))': {
        topic: function () { return rat.toDecimal(rat.fromDecimal(.0123456789)) },
        'approximates .0123456789': function (v) {
            assert.ok (Math.abs(v-.0123456789) < rat.EPSILON);
        }
    },
    'rat.toDecimal(rat.fromDecimal(420.00000000069))': {
        topic: function () { return rat.toDecimal(rat.fromDecimal(420.00000000069)) },
        'strictEquals 420.00000000069': function (v) {
            assert.strictEqual (v, 420.00000000069);
        }
    },
    'rat.toDecimal(rat.fromDecimal(511.99999999999994))': {
        topic: function () { return rat.toDecimal(rat.fromDecimal(511.99999999999994)) },
        'strictEquals 512': function (v) {
            assert.strictEqual (v, 512);
        }
    },  
    'rat.fromDecimal(2147483647/7)': {
        topic: function () { return rat.str(rat.fromDecimal(2147483647/7)) },
        'strictEquals "2147483647/7"': function (v) {
            assert.strictEqual (v, '2147483647/7');
        }
    },
}).export(module);

vows.describe('rats are properly normalized').addBatch({
    '-3/71': {
        topic: function () {
            var t = 2;
            return rat.str(rat.fromValues(3 * t, -71 * t))
        },
        'strictEquals "-3/71"': function (v) {
            assert.strictEqual (v, '-3/71');
        }
    },
    '11/3': {
        topic: function () {
            var t = -12147;
            return rat.str(rat.fromValues(11 * t, 3 * t));
        },
        'strictEquals "11/3"': function (v) {
            assert.strictEqual (v, '11/3');
        }
    },
    '7/9': {
        topic: function () {
            var t = 6934546;
            return rat.str(rat.fromValues(-7 * t, -9 * t));
        },
        'strictEquals "7/9"': function (v) {
            assert.strictEqual (v, '7/9');
        }
    },
}).export(module);

vows.describe('convert rat constants to decimal numbers').addBatch({
    'ZERO': {
        topic: function () { return rat.toDecimal(rat.ZERO) },
        'strictEquals 0': function (v) {
            assert.strictEqual (v, 0);
        }
    },
    'ONE': {
        topic: function () { return rat.toDecimal(rat.ONE) },
        'strictEquals 1': function (v) {
            assert.strictEqual (v, 1);
        }
    },
    'NEGONE': {
        topic: function () { return rat.toDecimal(rat.NEGONE) },
        'strictEquals -1': function (v) {
            assert.strictEqual (v, -1);
        }
    },
    'INFINITY': {
        topic: function () { return rat.toDecimal(rat.INFINITY) },
        'strictEquals Infinity': function (v) {
            assert.strictEqual (v, Infinity);
        }
    },
    'INFINULL': {
        topic: function () { return rat.toDecimal(rat.INFINULL) },
        'isNaN': function (v) {
            assert.isNaN (v);
        }
    },
    'PI': {
        topic: function () { return rat.toDecimal(rat.PI) },
        'strictEquals Math.PI': function (v) {
            assert.strictEqual (v, Math.PI);
        }
    },
}).export(module);

vows.describe('convert rats to Egyptian fractions').addBatch({
    'rat.toEgyptian(rat.fromValues(17, 360))': {
        topic: function () { return rat.toEgyptian(rat.fromValues(17, 360)) },
        'strictEquals "1/22 + 1/566 + 1/1120680"': function (v) {
            assert.strictEqual (v, "1/22 + 1/566 + 1/1120680");
        }
    },
}).export(module);

vows.describe('convert rats to Babylonian fractions').addBatch({
    'rat.toBabylonian(rat.fromValues(181237, 10))': {
        topic: function () { return rat.toBabylonian(rat.fromValues(181237, 10)) },
        'strictEquals "5 * 60^2 + 2 * 60^1 + 3 * 60^0 + 42 * 60^-1"': function (v) {
            assert.strictEqual (v, "5 * 60^2 + 2 * 60^1 + 3 * 60^0 + 42 * 60^-1");
        }
    },
}).export(module);





/*

//need to convert these to vows...

ratTest = TestCase("ratTest");

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
        rat.strictEquals(
            rat.ONE
            ,rat.clone(rat.ONE)
        )
    );

    assertFalse(
        rat.strictEquals(
            rat.NEGONE
            ,rat.clone(rat.ONE)
        )
    );

    assertTrue(
        rat.strictEquals(
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

*/
