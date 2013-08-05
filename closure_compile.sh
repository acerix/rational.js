closure --generate_exports --js \
src/integer.js \
src/biginteger.js \
src/bigint.js \
src/rat.js \
src/bigrat.js \
src/rational.js \
src/alpha.js \
src/physics.js \
src/polyrat.js \
src/deprecated.js \
> lib/temp.js

sed -e '/COMPILED_JAVASCRIPT_GOES_HERE/{
r lib/temp.js
d
}' < src/release-template.js > lib/rational.js

cp lib/rational.js ../gh-pages/releases/rationaljs.alpha.js

closure --js \
src/integer.js \
src/rat.js \
src/rational.js \
> lib/temp.js

sed -e '/COMPILED_JAVASCRIPT_GOES_HERE/{
r lib/temp.js
d
}' < src/release-template.js > lib/rational.lite.js

cp lib/rational.lite.js ../gh-pages/releases/rationaljs.lite.alpha.js

rm lib/temp.js
