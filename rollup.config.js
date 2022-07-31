import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

export default {
  input: "index.js",
  output: {
    file: "lib/index.cjs",
    format: "cjs",
  },
  external: ["node:child_process", "node:os", "node:process"],
  plugins: [commonjs(), nodeResolve(), terser()],
};
