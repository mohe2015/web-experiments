import typescript from '@rollup/plugin-typescript';
import resolve from "@rollup/plugin-node-resolve";
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: [
    './src/client/editing.ts',
    './src/client/custom-elements.ts',
  ],
  output: {
    dir: 'build',
    format: 'esm',
    sourcemap: true
  },
  plugins: [
    commonjs(),
    resolve({
      mainFields: ['browser', 'module', 'main'],
      extensions: [".mjs", ".js", ".ts"]
    }),
    typescript()
  ],
};
