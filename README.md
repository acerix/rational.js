Depreciated!
============

As of 2021, this project is depreciated in favour of [cnum](https://github.com/acerix/cnum/), revamped for the JavaScript BigInt primitive.


rational.js
===========

javascript tools and libraries based around rational numbers.

heavily inspired by glMatrix (http://glmatrix.net/), a high performance matrix and vector library.

Example usage in Node.js:

	var rational = require('bigrat').rational;
	var a = new rational(4, 5); // 4/5 
	var b = rational.fromDecimal(123.456789);
	var c = a.times(b);
	console.log('result: ' + c);


Documentation:

http://acerix.github.io/rational.js/


Releases:

http://acerix.github.io/rational.js/releases/rationaljs.lite.alpha.js (only contains rat{} and rational{})

http://acerix.github.com/rational.js/releases/rationaljs.alpha.js (includes bigrat{}, etc.)

