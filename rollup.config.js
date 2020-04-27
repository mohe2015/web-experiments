import typescript from '@rollup/plugin-typescript';
import resolve from "@rollup/plugin-node-resolve";
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: [
    './src/client/editing.ts',
    './src/client/database.ts',
    './src/client/custom-elements.ts',
    './src/client/webrtc.ts',
    './src/client/index.ts',
    './src/client/symmetric-webcryptography.ts',
    './src/client/urlhash-receiver.ts',
    './src/lib/asymmetric-webcryptography.ts',
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
