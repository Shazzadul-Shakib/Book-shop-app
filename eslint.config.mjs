import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  {
    ignores: ['node_modules', 'dist'],
    rules: {
      'no-unused-vars': 'error',
      'no-unused-expressions': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
      'no-undef': 'error',
    },
    globals: {
      process: 'readonly',
    },
  },
  {
    ignores: ['.node_modules/*', '.dist/*'],
  },
  {
    extends: [
      'eslint:recommended', // Base ESLint recommended rules
      pluginJs.configs.recommended, // ESLint JS plugin recommended rules
      'plugin:@typescript-eslint/recommended', // TypeScript ESLint recommended rules
    ],
  },

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
