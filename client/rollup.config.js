import typescript from '@rollup/plugin-typescript';
import resolve from "@rollup/plugin-node-resolve";
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: [
    './src/database.ts',
    './src/custom-elements.ts',
    './src/webrtc.ts',
    './src/index.ts',
    './src/symmetric-webcryptography.ts',
    './src/asymmetric-webcryptography.ts',
    './src/qrcode-generator.ts',
    './src/urlhash-receiver.ts',
  ],
  output: {
    dir: 'build',
    format: 'es',
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
