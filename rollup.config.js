const commonjs = require("@rollup/plugin-commonjs");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const { terser } = require("rollup-plugin-terser");

module.exports = {
  input: "index.js",
  output: {
    file: "lib/index.cjs",
    format: "cjs",
  },
  external: ["node:child_process", "node:os", "node:process"],
  plugins: [commonjs(), nodeResolve(), terser()],
};
