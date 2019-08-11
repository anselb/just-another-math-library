import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

const typescriptPlugin = require('typescript');

export default [
  {
    input: 'src/index.ts',
    plugins: [
      terser(),
      typescript({
        typescript: typescriptPlugin,
      }),
    ],
    output: {
      file: 'umd/just-another-math-library.js',
      format: 'umd',
      name: 'justAnotherMathLibrary',
      esModule: false,
    },
  },
  {
    input: 'src/index.ts',
    plugins: [
      typescript({
        typescript: typescriptPlugin,
      }),
    ],
    output: {
      file: 'esm/index.js',
      format: 'esm',
    },
  },
];
