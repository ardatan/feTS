// @ts-check
const js = require('@eslint/js');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const prettierConfig = require('eslint-config-prettier');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/scripts/**', '**/e2e/**', '**/benchmark/**', 'next-env.d.ts'],
  },
  js.configs.recommended,
  ...tsPlugin.configs['flat/recommended'],
  prettierConfig,
  {
    rules: {
      'no-empty': 'off',
      'no-console': 'off',
      'no-prototype-builtins': 'off',
      'no-useless-constructor': 'off',
      'no-useless-escape': 'off',
      'no-undef': 'off',
      'no-useless-assignment': 'off',
      'no-dupe-class-members': 'off',
      'dot-notation': 'off',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.json', 'website/tsconfig.json'],
      },
      globals: {
        BigInt: true,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/ban-ts-ignore': 'off',
      '@typescript-eslint/return-await': 'error',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'default-param-last': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'tailwindcss/classnames-order': 'off',
    },
  },
  {
    files: ['**/{test,tests,testing}/**/*.{ts,js}', '*.{spec,test}.{ts,js}'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
];
