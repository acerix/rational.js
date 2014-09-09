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

(function(_global) {
	"use strict";
	var shim = {};
	if (typeof(exports) === 'undefined') {
		if(typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
			shim.exports = {};
			define(function() {
				return shim.exports;
			});
		} else {
			// browser, define in global
			shim.exports = typeof(window) !== 'undefined' ? window : _global;
		}
	}
	else {
		// commonjs, define in exports
		shim.exports = exports;
	}
	(function(exports) {
var integer={greatest_common_divisor:function(a,b){if(1===b||1===a)return 1;for(var c;0!==b;){c=b;b=a%b;if(!isFinite(b))return 0;a=c}return a}};integer.gcd=integer.greatest_common_divisor;integer.fromRandom=function(a){return Math.random()*(1<<a)>>>0};integer.fromMillitime=function(){return+new Date};integer.fromUnixtime=function(){return.001*integer.fromMillitime()|0};"undefined"!==typeof exports&&(exports.integer=integer);if(!RAT_ARRAY_TYPE)var RAT_ARRAY_TYPE="undefined"!==typeof Float32Array?Float32Array:Array;if(!RAT_INFINITESIMAL_PRECISION)var RAT_INFINITESIMAL_PRECISION=Math.pow(2,56);if(!RAT_MAX_LOOPS)var RAT_MAX_LOOPS=16777216;var rat={EPSILON:2E-16};rat.MAX_LOOPS=RAT_MAX_LOOPS;rat.create=function(){var a=new RAT_ARRAY_TYPE(2);a[0]=0;a[1]=1;return a};rat.clone=function(a){var b=new RAT_ARRAY_TYPE(2);b[0]=a[0];b[1]=a[1];return b};
rat.fromValues=function(a,b){var c=new RAT_ARRAY_TYPE(2);c[0]=a;c[1]=b;return rat.normalize(c,c)};rat.copy=function(a,b){a[0]=b[0];a[1]=b[1];return a};rat.set=function(a,b,c){a[0]=b;a[1]=c;return rat.normalize(a,a)};rat.abs=function(a,b){a[0]=Math.abs(b[0]);a[1]=b[1];return a};rat.invert=function(a,b){var c=b[0];a[0]=b[1];a[1]=c;return a};rat.reciprocal=rat.invert;rat.add=function(a,b,c){b[1]===c[1]?(a[0]=b[0]+c[0],a[1]=b[1]):(a[0]=b[0]*c[1]+c[0]*b[1],a[1]=b[1]*c[1]);return rat.normalize(a,a)};
rat.subtract=function(a,b,c){b[1]===c[1]?(a[0]=b[0]-c[0],a[1]=b[1]):(a[0]=b[0]*c[1]-c[0]*b[1],a[1]=b[1]*c[1]);return rat.normalize(a,a)};rat.sub=rat.subtract;rat.multiply=function(a,b,c){a[0]=b[0]*c[0];a[1]=b[1]*c[1];return rat.normalize(a,a)};rat.mul=rat.multiply;rat.mediant=function(a,b,c){a[0]=b[0]+c[0];a[1]=b[1]+c[1];return rat.normalize(a,a)};rat.divide=function(a,b,c){a[0]=b[0]*c[1];a[1]=b[1]*c[0];return rat.normalize(a,a)};rat.div=rat.divide;
rat.equals=function(a,b){return 0===a[0]&&0===b[0]||0===a[1]&&0===b[1]?!0:a[0]===b[0]&&a[1]===b[1]};rat.approximates=function(a,b){if(rat.equals(a,b))return!0;var c=rat.create();rat.sub(c,a,b);rat.abs(c,c);return rat.isLessThan(c,rat.INFINITESIMAL)};rat.isGreaterThan=function(a,b){return rat.equals(a,b)?!1:a[0]*b[1]>b[0]*a[1]};rat.isLessThan=function(a,b){return rat.equals(a,b)?!1:a[0]*b[1]<b[0]*a[1]};rat.isNegative=function(a){return 0>a[0]};
rat.min=function(a,b,c){rat.isLessThan(b,c)?(a[0]=b[0],a[1]=b[1]):(a[0]=c[0],a[1]=c[1]);return a};rat.max=function(a,b,c){rat.isGreaterThan(b,c)?(a[0]=b[0],a[1]=b[1]):(a[0]=c[0],a[1]=c[1]);return a};rat.scalar_multiply=function(a,b,c){a[0]=b[0]*c;a[1]=b[1];return rat.normalize(a,a)};rat.scalar_divide=function(a,b,c){a[0]=b[0];a[1]=b[1]*c;return rat.normalize(a,a)};
rat.normalize=function(a,b){if(isNaN(b[0])||isNaN(b[1])||0===b[0]&&0===b[1])return a[0]=0,a[1]=0,a;if(0===b[0])return a[0]=0,a[1]=1,a;if(0===b[1])return a[0]=1,a[1]=0,a;if(b[0]===b[1])return a[0]=1,a[1]=1,a;0<b[1]?(a[0]=b[0],a[1]=b[1]):(a[0]=-b[0],a[1]=-b[1]);var c=integer.greatest_common_divisor(Math.abs(a[0]),a[1]);1<c&&(a[0]/=c,a[1]/=c);return a};rat.opposite=function(a,b){a[0]=-b[0];a[1]=b[1];return a};rat.negative=rat.opposite;rat.neg=rat.opposite;
rat.power=function(a,b,c){2===c?(a[0]=b[0]*b[0],a[1]=b[1]*b[1]):0<c?(a[0]=Math.pow(b[0],c),a[1]=Math.pow(b[1],c)):0>c?(c=Math.abs(c),a[0]=Math.pow(b[1],c),a[1]=Math.pow(b[0],c)):rat.copy(a,rat.ONE);return rat.normalize(a,a)};rat.pow=rat.power;rat.sqrt=function(a,b){return rat.nthRoot(a,b,2)};
rat.nthRoot=function(a,b,c){if(rat.equals(b,rat.ZERO))return rat.copy(a,rat.ZERO);if(rat.equals(b,rat.ONE))return rat.copy(a,rat.ONE);if(rat.equals(b,rat.INFINITY))return rat.copy(a,rat.INFINITY);if(rat.equals(b,rat.INFINULL))return rat.copy(a,rat.INFINULL);var d=rat.isNegative(b);d&&(b[0]=-b[0]);a=rat.copy(a,rat.ONE);for(var e=[1,0,0,1],f=rat.clone(rat.ONE),h=rat.MAX_LOOPS;!rat.approximates(b,f)&&h--;)rat.isLessThan(b,f)?(e[0]+=e[1],e[2]+=e[3]):(e[1]+=e[0],e[3]+=e[2]),a[0]=e[0]+e[1],a[1]=e[2]+e[3],
rat.pow(f,a,c);d&&(b[0]=-b[0],1===c%2&&rat.neg(a,a));return a};rat.dot=function(a,b){return a[0]*b[0]+a[1]*b[1]};rat.str=function(a){return 1===a[1]?a[0].toString():a[0]+"/"+a[1]};rat.toDecimal=function(a){return a[0]/a[1]};rat.dec=rat.toDecimal;rat.toInteger=function(a){return Math.round(rat.toDecimal(a))};rat.round=rat.toInteger;rat.floor=function(a){return Math.floor(rat.toDecimal(a))};rat.ceil=function(a){return Math.ceil(rat.toDecimal(a))};
rat.fromInteger_copy=function(a,b){a[0]=parseInt(b);a[1]=1;return a};rat.fromInteger=function(a){return rat.fromInteger_copy(rat.create(),a)};rat.fromIntegerInverse_copy=function(a,b){a[0]=1;a[1]=parseInt(b);0>a[1]&&(a[0]=-a[0],a[1]=-a[1]);return a};rat.fromIntegerInverse=function(a){return rat.fromIntegerInverse_copy(rat.create(),a)};rat.fromDecimal=function(a){return rat.fromDecimal_copy(rat.create(),a)};
rat.fromDecimal_copy=function(a,b){b=parseFloat(b);if(isNaN(b))return rat.copy(a,rat.INFINULL);if(Infinity===b)return rat.copy(a,rat.INFINITY);if(Math.abs(b)<rat.EPSILON)return rat.copy(a,rat.ZERO);if(Math.abs(b-1)<rat.EPSILON)return rat.copy(a,rat.ONE);if(Math.abs(b%1)<rat.EPSILON)return rat.fromInteger_copy(a,b);if(Math.abs(1/b%1)<rat.EPSILON)return rat.fromIntegerInverse_copy(a,Math.round(1/b));rat.copy(a,rat.ONE);for(var c=[1,0,0,1],d=b,e=1,f=rat.MAX_LOOPS;f--&&Math.abs(b-rat.toDecimal(a))>rat.EPSILON;)e=
Math.floor(d),a[0]=e*c[0]+c[2],a[1]=e*c[1]+c[3],d=1/(d-e),c[2]=c[0],c[3]=c[1],c[0]=a[0],c[1]=a[1];return a};rat.fromRandom=function(a){a[0]=0xfffffffffffff*Math.random()<<0;a[1]=Math.abs(0xfffffffffffff*Math.random()<<0);return rat.normalize(a,a)};rat.sin=function(a,b){if(0===b[1])return rat.copy(a,rat.ZERO);rat.scalar_multiply(a,b,2);var c=rat.create();rat.pow(c,b,2);rat.add(c,c,rat.ONE);rat.divide(a,a,c);return a};
rat.cos=function(a,b){if(0===b[1])return rat.neg(a,rat.ONE);var c=rat.create();rat.pow(c,b,2);rat.sub(a,rat.ONE,c);var d=rat.create();rat.add(d,rat.ONE,c);rat.divide(a,a,d);return a};rat.tan=function(a,b){rat.scalar_multiply(a,b,2);var c=rat.create();rat.pow(c,b,2);rat.scalar_multiply(c,c,2);rat.add(a,a,c);rat.pow(c,b,4);rat.sub(c,rat.ONE,c);rat.divide(a,a,c);return a};
rat.toEgyptian=function(a){a=rat.clone(a);rat.abs(a,a);var b=rat.floor(a);b&&rat.sub(a,a,rat.fromInteger(b));if(!a[0])return b.toString();b||(b="");for(var c=1,d=rat.create();1!==a[0];)c++,d=rat.fromValues(1,c),rat.isGreaterThan(a,d)&&(b&&(b+=" + "),b+=rat.str(d),rat.sub(a,a,d));return a?b?b+" + "+rat.str(a):rat.str(a):b?b:"0"};
rat.toBabylonian=function(a){var b="",c=rat.toDecimal(a);a=parseInt(c);for(var c=c-a,d=0,e=0;0<a;)(d=a%60)&&(b=d+" * 60^"+e+(b?" + ":"")+b),a=(a-d)/60,e++;for(e=-1;0<c;)c*=60,d=parseInt(c+1E-13),c-=d,-1E-13>c||(d&&(b+=(b?" + ":"")+d+" * 60^"+e),e--);return b?b:"0"};
rat.traceSternBrocot=function(a){var b="";if(rat.equals(a,rat.ZERO)||rat.equals(a,rat.ONE)||rat.equals(a,rat.INFINITY)||rat.equals(a,rat.INFINULL))return b;if(rat.equals(a,rat.ZERO))return rat.copy(out,rat.ZERO);if(rat.equals(a,rat.ONE))return rat.copy(out,rat.ONE);if(rat.equals(a,rat.INFINITY))return rat.copy(out,rat.INFINITY);if(rat.equals(a,rat.INFINULL))return rat.copy(out,rat.INFINULL);a=rat.clone(a);rat.isNegative(a)&&(a[0]=-a[0]);for(var c=rat.clone(rat.ONE),d=[1,0,0,1],e=0,f=0,h=rat.MAX_LOOPS;!rat.approximates(a,
c)&&h--;)rat.isLessThan(a,c)?(d[0]+=d[1],d[2]+=d[3],f++,e&&(b+="R",1!==e&&(b+=e),e=0,b+=" ")):(d[1]+=d[0],d[3]+=d[2],e++,f&&(b+="L",1!==f&&(b+=f),f=0,b+=" ")),c[0]=d[0]+d[1],c[1]=d[2]+d[3];f?(b+="L",1!==f&&(b+=f)):e&&(b+="R",1!==e&&(b+=e));0>h&&(b+="...");return b};
rat.toContinuedFraction=function(a,b){b="undefined"===typeof b?65536:parseInt(b);if(rat.equals(a,rat.ZERO))return[0];if(rat.equals(a,rat.ONE))return[1];if(rat.equals(a,rat.NEGONE))return[-1];if(rat.equals(a,rat.INFINITY))return[1,0];if(rat.equals(a,rat.INFINULL))return[0,0];var c=rat.clone(a),d=rat.isNegative(c);d&&(c[0]=-c[0]);for(var e=rat.clone(rat.ONE),f=[1,0,0,1],h=1,g=[0],k=g.length-1;!rat.equals(c,e)&&b--;)rat.isLessThan(c,e)?(-1===h?g[k]++:(h=-1,g.push(1),k++),f[0]+=f[1],f[2]+=f[3]):(1===
h?g[k]++:(h=1,g.push(1),k++),f[1]+=f[0],f[3]+=f[2]),e[0]=f[0]+f[1],e[1]=f[2]+f[3];0>b?g.push(0):g[k]++;if(d)for(var l in g)g[l]=-g[l];return g};rat.fromContinuedFraction=function(a,b){rat.fromInteger_copy(a,b[b.length-1]);for(var c=b.length-2;-1<c;c--)rat.invert(a,a),rat.add(a,rat.fromInteger(b[c]),a);return a};rat.dump=function(a){rat.create();return"rat\t"+rat.str(a)+"\n~\t"+rat.toDecimal(a)+"\nCF:\t["+rat.toContinuedFraction(a)+"]\n"};rat.ZERO=rat.fromInteger(0);rat.ONE=rat.fromInteger(1);
rat.NEGONE=rat.fromInteger(-1);rat.INFINITY=rat.fromValues(1,0);rat.INFINULL=rat.fromValues(0,0);rat.INFINITESIMAL=rat.clone([1,RAT_INFINITESIMAL_PRECISION]);rat.PI=rat.fromValues(1320192667429,420230377710);"undefined"!==typeof exports&&(exports.rat=rat);var rational=function(a,b){this.a=rat.fromValues(parseInt(a),parseInt(b))};rational.prototype.toString=function(){return rat.str(this.a)};rational.prototype.toContinuedFraction=function(a){return rat.toContinuedFraction(this.a,a)};rational.prototype.invert=function(){return rat.invert(this.a)};rational.prototype.reciprocal=rational.prototype.invert;rational.prototype.add=function(a){var b=rat.create();rat.add(b,this.a,a.a);return new rational(b[0],b[1])};rational.prototype.plus=rational.prototype.add;
rational.prototype.subtract=function(a){var b=rat.create();rat.sub(b,this.a,a.a);return new rational(b[0],b[1])};rational.prototype.sub=rational.prototype.subtract;rational.prototype.minus=rational.prototype.subtract;rational.prototype.multiply=function(a){var b=rat.create();rat.mul(b,this.a,a.a);return new rational(b[0],b[1])};rational.prototype.mul=rational.prototype.multiply;rational.prototype.times=rational.prototype.multiply;
rational.prototype.mediant=function(a){var b=rat.create();rat.mediant(b,this.a,a.a);return new rational(b[0],b[1])};rational.prototype.divide=function(a){var b=rat.create();rat.div(b,this.a,a.a);return new rational(b[0],b[1])};rational.prototype.div=rational.prototype.divide;rational.prototype.divided_by=rational.prototype.divide;rational.prototype.power=function(a){var b=rat.create();rat.pow(b,this.a,a);return new rational(b[0],b[1])};rational.prototype.pow=rational.prototype.power;
rational.prototype.dump=function(){return rat.dump(this.a)};rational.prototype.toRat=function(){return rat.clone(this.a)};rational.prototype.toDecimal=function(){return rat.toDecimal(this.a)};rational.fromRat=function(a){var b=new rational;b.a[0]=a[0];b.a[1]=a[1];return b};rational.fromInteger=function(a){return rational.fromRat(rat.fromInteger(a))};rational.fromIntegerInverse=function(a){return rational.fromRat(rat.fromIntegerInverse(a))};rational.fromDecimal=function(a){return rational.fromRat(rat.fromDecimal(a))};
rational.fromContinuedFraction=function(a){return rational.fromRat(rat.fromContinuedFraction(rat.create(),a))};"undefined"!==typeof exports&&(exports.rational=rational);
	})(shim.exports);
})(this);
