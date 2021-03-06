
var vows = require('vows'),
    assert = require('assert');

integer = require('../src/integer.js').integer;
rat = require('../src/rat.js').rat;
BigInteger = require('../src/biginteger.js').BigInteger;
bigint = require('../src/bigint.js').bigint;
bigrat = require('../src/bigrat.js').bigrat;

vows.describe('convert bigrat{} constants to strings').addBatch({
    'bigrat.str(bigrat.ZERO)': {
        topic: function () { return bigrat.str(bigrat.ZERO) },
        'strictEquals "0"': function (v) {
            assert.strictEqual (v, '0');
        }
    },
    'bigrat.str(bigrat.ONE)': {
        topic: function () { return bigrat.str(bigrat.ONE) },
        'strictEquals "1"': function (v) {
            assert.strictEqual (v, '1');
        }
    },
    'bigrat.str(bigrat.NEGONE)': {
        topic: function () { return bigrat.str(bigrat.NEGONE) },
        'strictEquals "-1"': function (v) {
            assert.strictEqual (v, '-1');
        }
    },
    'bigrat.str(bigrat.INFINITY)': {
        topic: function () { return bigrat.str(bigrat.INFINITY) },
        'strictEquals "1/0"': function (v) {
            assert.strictEqual (v, '1/0');
        }
    },
    'bigrat.str(bigrat.INFINULL)': {
        topic: function () { return bigrat.str(bigrat.INFINULL) },
        'strictEquals "0/0"': function (v) {
            assert.strictEqual (v, '0/0');
        }
    },
}).export(module);

vows.describe('convert decimal numbers to bigrat{}').addBatch({
    'bigrat.fromDecimal(1/7)': {
        topic: function () { return bigrat.str(bigrat.fromDecimal(1/7)) },
        'strictEquals "1/7"': function (v) {
            assert.strictEqual (v, '1/7');
        }
    },
    'bigrat.fromDecimal(1/49)': {
        topic: function () { return bigrat.str(bigrat.fromDecimal(1/49)) },
        'strictEquals "1/49"': function (v) {
            assert.strictEqual (v, '1/49');
        }
    },
    'bigrat.fromDecimal(1/98)': {
        topic: function () { return bigrat.str(bigrat.fromDecimal(1/98)) },
        'strictEquals "1/98"': function (v) {
            assert.strictEqual (v, '1/98');
        }
    },
    'bigrat.fromDecimal(1/103)': {
        topic: function () { return bigrat.str(bigrat.fromDecimal(1/103)) },
        'strictEquals "1/103"': function (v) {
            assert.strictEqual (v, '1/103');
        }
    },
    'bigrat.fromDecimal(1/107)': {
        topic: function () { return bigrat.str(bigrat.fromDecimal(1/107)) },
        'strictEquals "1/107"': function (v) {
            assert.strictEqual (v, '1/107');
        }
    },
    'bigrat.toDecimal(bigrat.fromDecimal(10000.00001))': {
        topic: function () { return bigrat.toDecimal(bigrat.fromDecimal(10000.00001)) },
        'strictEquals 10000.00001': function (v) {
            assert.strictEqual (v, 10000.00001);
        }
    },
    'bigrat.toDecimal(bigrat.fromDecimal(100000.000001))': {
        topic: function () { return bigrat.toDecimal(bigrat.fromDecimal(100000.000001)) },
        'strictEquals 100000.000001': function (v) {
            assert.strictEqual (v, 100000.000001);
        }
    },
    'bigrat.toDecimal(bigrat.fromDecimal(.0123456789))': {
        topic: function () { return bigrat.toDecimal(bigrat.fromDecimal(.0123456789)) },
        'approximates .0123456789': function (v) {
            assert.ok (Math.abs(v-.0123456789) < bigrat.EPSILON);
        }
    },
    'bigrat.toDecimal(bigrat.fromDecimal(420.00000069))': {
        topic: function () { return bigrat.toDecimal(bigrat.fromDecimal(420.00000069)) },
        'strictEquals 420.00000069': function (v) {
            assert.strictEqual (v, 420.00000069);
        }
    },
    'bigrat.toDecimal(bigrat.fromDecimal(511.99999999999994))': {
        topic: function () { return bigrat.toDecimal(bigrat.fromDecimal(511.99999999999994)) },
        'strictEquals 511.99999999999994': function (v) {
            assert.strictEqual (v, 511.99999999999994);
        }
    },
}).export(module);

vows.describe('bigrat.PI gives the correct approximation').addBatch({
    'bigrat.toDecimal(bigrat.PI)': {
        topic: function () { return bigrat.toDecimal(bigrat.PI) },
        'strictEquals Math.PI': function (v) {
            assert.strictEqual (v, Math.PI);
        }
    },
}).export(module);
