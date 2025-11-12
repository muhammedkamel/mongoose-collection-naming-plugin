import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import nodePlugin from 'eslint-plugin-n';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import securityPlugin from 'eslint-plugin-security';
import sonarPlugin from 'eslint-plugin-sonarjs';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';

export default [
  // Ignore patterns (replaces .eslintignore)
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'coverage/**',
    ],
  },

  // Base JavaScript recommended rules
  js.configs.recommended,

  // Base configuration for all TypeScript files
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
        sourceType: 'module',
      },
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'import': importPlugin,
      '@stylistic': stylistic,
      'sonarjs': sonarPlugin,
      'security': securityPlugin,
      'n': nodePlugin,
      'prettier': prettierPlugin,
    },
    rules: {
      // Extend recommended rules from plugins
      ...tseslint.configs.recommended[0].rules,
      ...nodePlugin.configs.recommended.rules,
      ...securityPlugin.configs.recommended.rules,
      ...sonarPlugin.configs.recommended.rules,

      // TypeScript naming conventions
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          prefix: ['I'],
        },
      ],

      // TypeScript-specific rules
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { ignoreRestSiblings: true },
      ],

      // Node.js plugin rules
      'n/no-missing-import': 'off',
      'n/no-unsupported-features/es-syntax': 'off', // Allow ESM syntax

      // Import plugin rules
      'import/no-unresolved': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'external',
            'builtin',
            'internal',
            ['sibling', 'parent'],
            'index',
          ],
        },
      ],

      // Stylistic rules
      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: 'block-like', next: '*' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
        { blankLine: 'always', prev: 'directive', next: '*' },
        { blankLine: 'any', prev: 'directive', next: 'directive' },
        { blankLine: 'always', prev: ['case', 'default'], next: '*' },
      ],
      '@stylistic/lines-between-class-members': ['error', 'always'],

      // Security rules
      'security/detect-object-injection': 'off',

      // Prettier integration
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
  },

  // Override for test/spec files
  {
    files: ['**/*.spec.ts', '**/*.spec.tsx', '**/*.test.ts', '**/*.test.tsx'],
    rules: {
      'sonarjs/no-duplicate-string': 'off',
    },
  },
];

