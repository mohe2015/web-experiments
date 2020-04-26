import typescript from '@rollup/plugin-typescript';
import resolve from "@rollup/plugin-node-resolve";
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: './src/client/editing.js',
  output: {
    dir: 'build',
    format: 'esm',
    sourcemap: true
  },
  plugins: [
    typescript({
      
    }),
    commonjs(),
    resolve({
      mainFields: ['browser', 'module', 'main'],
      extensions: [".mjs", ".js", ".ts"]
    }),
  ],
};
