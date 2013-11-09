
var vows = require('vows'),
    assert = require('assert');

integer = require('../src/integer.js').integer;
rat = require('../src/rat.js').rat;
polyrat = require('../src/polyrat.js').polyrat;

vows.describe('polyrat{} constants are correct').addBatch({
    'polyrat.ZERO': {
        topic: function () { return polyrat.ZERO },
        'equals [[0],[0]]': function (v) {
            assert.deepEqual (v, [[0],[0]]);
        }
    },
    'polyrat.ONE': {
        topic: function () { return polyrat.ONE },
        'equals [[1],[0]]': function (v) {
            assert.deepEqual (v, [[1],[0]]);
        }
    },
}).export(module);

/*
vows.describe('convert polyrat{} constants to strings').addBatch({
    'polyrat.str(polyrat.ZERO)': {
        topic: function () { return polyrat.str(polyrat.ZERO) },
        'equals "[0]"': function (v) {
            assert.equal (v, '[0]');
        }
    },
    'polyrat.str(polyrat.ONE)': {
        topic: function () { return polyrat.str(polyrat.ONE) },
        'equals "[1]"': function (v) {
            assert.equal (v, '[1]');
        }
    },
}).export(module);
*/

/*

vows.describe('basic polyrat{} operations').addBatch({
    'add two ONE polyrats': {
        topic: function () { return polyrat.str(polyrat.add(polyrat.create(), polyrat.ONE, polyrat.ONE)) },
        'equals "[2]"': function (v) {
            assert.equal (v, '[2]');
        }
    },
    'add two 2-dimensional polyrats': {
        topic: function () { return polyrat.str(polyrat.add(polyrat.create(), polyrat.fromValues([0,0,1]), polyrat.fromValues([0,0,2,0,7]))) },
        'equals "[0,0,3,0,7]"': function (v) {
            assert.equal (v, '[0,0,3,0,7]');
        }
    },
}).export(module);
*/
