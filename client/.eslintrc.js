const path = require('path');

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'plugin:sonarjs/recommended',
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'jest', 'prettier', 'simple-import-sort', 'sonarjs'],
  env: {
    browser: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'no-console': 0,
    'sort-imports': 0,
    'spaced-comment': [2, 'always', { markers: ['/'] }],
    'react/state-in-constructor': 0,
    'react/static-property-placement': 0,
    'react/jsx-curly-newline': 0,
    'react/jsx-filename-extension': [2, { extensions: ['.ts', '.tsx'] }],
    'react/jsx-one-expression-per-line': 0,
    'react/destructuring-assignment': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/no-unused-vars': [2, { argsIgnorePattern: '^_' }],
    'simple-import-sort/sort': 2,
    'import/order': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.test.tsx', '**/*.stories.tsx', 'craco.config.js', '**/test/*'] },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  overrides: [
    {
      files: ['*.tsx'],
      rules: {
        'react/jsx-props-no-spreading': 0,
        'react/prop-types': 0,
      },
    },
    {
      files: ['**/store/*.ts'],
      rules: {
        'no-param-reassign': 0,
      },
    },
    {
      files: ['**/*.translations.ts'],
      rules: {
        '@typescript-eslint/camelcase': 0,
      },
    },
    {
      files: ['**/models/*.ts'],
      rules: {
        'import/no-cycle': 0,
      },
    },
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 0,
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname, 'src')],
        extensions: ['.js', '.ts', '.tsx'],
      },
      typescript: {
        directory: path.resolve(__dirname, 'tsconfig.json'),
      },
    },
  },
};
