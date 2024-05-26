import jslint from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import pluginPrettier from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tslint from 'typescript-eslint';

export default [
  jslint.configs.recommended,
  ...tslint.configs.recommended,
  pluginPrettier,

  /* Custom config */
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        parser: tsParser,
        sourceType: 'module'
      }
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
];
