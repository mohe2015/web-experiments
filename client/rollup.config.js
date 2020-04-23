import typescript from '@rollup/plugin-typescript';
import resolve from "@rollup/plugin-node-resolve";

export default {
  input: './src/database.ts',
  output: {
    name: 'index',
    dir: 'output',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    resolve({ jsnext: true, extensions: [".ts"] }),
    typescript({
    }),
  ]
};
