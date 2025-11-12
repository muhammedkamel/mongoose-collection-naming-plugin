import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';

const external = [
  'mongoose',
  'pluralize',
];

export default [
  // ESM and CommonJS builds
  {
    input: 'lib/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'esm',
        sourcemap: true,
      },
      {
        file: 'dist/index.cjs',
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
    ],
    external,
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.build.json',
        sourceMap: true,
        declaration: false, // We'll use rollup-plugin-dts for declarations
        declarationMap: false,
        compilerOptions: {
          isolatedDeclarations: false, // Not needed for rollup build
        },
      }),
    ],
  },
  // Type definitions bundle
  {
    input: 'lib/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'esm',
    },
    external,
    plugins: [dts()],
  },
];

