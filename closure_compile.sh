cat \
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
> dist/rational.js

cp dist/rational.js ../gh-pages/releases/rationaljs.alpha.js

closure --js \
src/integer.js \
src/rat.js \
src/rational.js \
> dist/rational.min.js

cp dist/rational.min.js ../gh-pages/releases/ratjs.alpha.min.js

