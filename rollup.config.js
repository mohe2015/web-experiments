import typescript from '@rollup/plugin-typescript';
import resolve from "@rollup/plugin-node-resolve";
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: [
    './src/client/database.ts',
    './src/client/custom-elements.ts',
    './src/client/webrtc.ts',
    './src/client/index.ts',
    './src/client/symmetric-webcryptography.ts',
    './src/client/urlhash-receiver.ts',
    './src/lib/asymmetric-webcryptography.ts'
  ],
  output: {
    dir: 'build',
    format: 'esm',
    sourcemap: true
  },
  plugins: [
    typescript(),
    commonjs(),
    resolve({
      preferBuiltins: false,
      browser: true, 
      jsnext: true, 
      extensions: [".ts", ".js"]
    }),
  ],
};
