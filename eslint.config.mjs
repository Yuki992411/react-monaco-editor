import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import gitignore from 'eslint-config-flat-gitignore';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginImport from 'eslint-plugin-import';
import reactRefresh from 'eslint-plugin-react-refresh';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import tsESLint from 'typescript-eslint';

const compat = new FlatCompat();

/** @type {import('eslint').Linter.FlatConfig} */
const customConfig = {
  languageOptions: {
    parserOptions: {
      project: true,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      tsconfigRootDir: import.meta.dirname,
    },
  },
  plugins: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    'unused-imports': eslintPluginUnusedImports,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    import: eslintPluginImport,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    'react-refresh': reactRefresh,
  },
  rules: {
    'no-console': 'error',
    '@typescript-eslint/no-unused-expressions': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['..*'],
            message: '相対パスでのimportは禁止しています',
          },
        ],
      },
    ],
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
};

/** @type {import('eslint').Linter.FlatConfig} */
export const customImportConfig = {
  rules: {
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'object',
          'type',
          'index',
        ],
        'newlines-between': 'always',
        pathGroupsExcludedImportTypes: ['builtin', 'type'],
        pathGroups: [
          {
            pattern: '{react,react-dom/**,react-router-dom}',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '~/**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: '@/lib/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/utils/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/types/**',
            group: 'type',
            position: 'after',
          },
          {
            pattern: '@/mocks/**',
            group: 'index',
            position: 'after',
          },
          {
            pattern: './**/styles.module.scss',
            group: 'index',
            position: 'after',
          },
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  {
    files: ['src/**/*.{ts,tsx}'],
  },
  {
    /**
     * NOTE: filesとは別のオブジェクトにする必要がある
     * @see https://eslint.org/docs/latest/use/configure/configuration-files-new#globally-ignoring-files-with-ignores
     */
    ignores: [
      'prettier.config.mjs',
      'lint-staged.config.mjs',
      'vite.config.ts',
      'jest.config.ts',
    ],
  },
  gitignore(),
  js.configs.recommended,
  eslintConfigPrettier,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  ...tsESLint.configs.strictTypeChecked,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  ...tsESLint.configs.stylisticTypeChecked,
  ...compat.extends('plugin:react-hooks/recommended'),
  customConfig,
  customImportConfig,
];

export default config;
