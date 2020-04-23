import typescript from '@rollup/plugin-typescript';
import resolve from "@rollup/plugin-node-resolve";

export default {
  input: './src/database.ts',
  output: {
    dir: 'output',
    format: 'es'
  },
  plugins: [
    resolve({ jsnext: true, extensions: [".ts"] }),
    typescript(),
  ]
};
