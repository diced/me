import pluginJs from '@eslint/js';
import pluginAstro from 'eslint-plugin-astro';
import pluginReact from 'eslint-plugin-react';
import pluginUnusedImports from 'eslint-plugin-unused-imports';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: { js: pluginJs },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['**/*.{jsx,tsx}'],
    ...pluginReact.configs.flat.recommended,
  },
  pluginAstro.configs.recommended,
  {
    files: ['**/*.astro', '*.astro'],
    parser: '@typescript-eslint/parser',
  },
  tseslint.configs.recommended,
  {
    plugins: {
      'unused-imports': pluginUnusedImports,
    },
    rules: {
      'linebreak-style': ['error', 'unix'],
      quotes: [
        'error',
        'single',
        {
          avoidEscape: true,
        },
      ],
      semi: ['error', 'always'],
      'jsx-quotes': ['error', 'prefer-single'],
      indent: 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    ignores: ['.astro', '.vercel', '.vscode', 'dist', 'node_modules', '.env*'],
  },
]);
