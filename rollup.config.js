const commonjs = require('@rollup/plugin-commonjs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');

module.exports = {
  input: 'index.js',
  output: {
    exports: 'default',
    file: 'lib/index.js',
    format: 'cjs',
  },
  plugins: [
    commonjs(),
    nodeResolve(),
    terser(),
  ],
};
