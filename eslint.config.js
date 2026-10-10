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
  { ignores: ['dist/**', 'node_modules/**', 'coverage/**'] },

  js.configs.recommended,

  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { project: './tsconfig.json', tsconfigRootDir: import.meta.dirname, sourceType: 'module' },
      globals: { ...globals.node },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      import: importPlugin,
      '@stylistic': stylistic,
      sonarjs: sonarPlugin,
      security: securityPlugin,
      n: nodePlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...tseslint.configs.recommended[0].rules,
      ...nodePlugin.configs.recommended.rules,
      ...securityPlugin.configs.recommended.rules,
      ...sonarPlugin.configs.recommended.rules,

      '@typescript-eslint/naming-convention': ['error', { selector: 'interface', format: ['PascalCase'] }],

      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', ignoreRestSiblings: true }],

      'n/no-missing-import': 'off',
      'n/no-unsupported-features/es-syntax': 'off',

      'import/no-unresolved': 'error',
      'import/order': ['error', { groups: ['external', 'builtin', 'internal', ['sibling', 'parent'], 'index'] }],

      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: 'block-like', next: '*' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        { blankLine: 'always', prev: 'directive', next: '*' },
        { blankLine: 'always', prev: ['case', 'default'], next: '*' },
      ],
      '@stylistic/lines-between-class-members': ['error', 'always'],

      'security/detect-object-injection': 'off',

      ...prettierConfig.rules,
      'prettier/prettier': 'error',
    },
    settings: {
      'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
      'import/resolver': { typescript: { alwaysTryTypes: true } },
    },
  },

  {
    files: ['**/*.spec.ts', '**/*.test.ts'],
    rules: {
      'sonarjs/no-duplicate-string': 'off',
      '@stylistic/padding-line-between-statements': 'off',
    },
  },

  { files: ['test/dist/**/*.spec.ts'], rules: { 'import/no-unresolved': 'off' } },
];