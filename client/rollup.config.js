import typescript from '@rollup/plugin-typescript';
import resolve from "@rollup/plugin-node-resolve";

export default {
  input: [
    './src/database.ts',
    './src/custom-elements.ts',
    './src/webrtc.ts',
    './src/index.ts',
    './src/webcryptography.ts'
  ],
  output: {
    dir: 'build',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    resolve({ browser: true, jsnext: true, extensions: [".ts"] }),
    typescript({
    }),
  ]
};
