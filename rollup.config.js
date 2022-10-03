// Check out rollup.js at: https://rollupjs.org/guide/en/

import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

export default {
  input: "index.js",
  output: {
    file: "lib/index.cjs",
    format: "cjs",
  },
  plugins: [
    commonjs(),
    nodeResolve({
      exportConditions: ["node"],
      preferBuiltins: true,
    }),
    terser(),
  ],
};
