closure --js `find src -name "*.js" | xargs` | gzip -9 > dist/rational.js.gz
