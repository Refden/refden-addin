module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    "Word": "readonly",
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'import/extensions': 'off',
    'import/order': ['error', { 'newlines-between': 'always' }],
    'jsx-a11y/anchor-is-valid': 'off',
    'no-param-reassign': ['error', { props: false }],
    'no-use-before-define': 'off',
    'object-curly-spacing': [2, 'always'],
    'quotes': [2, 'single'],
    'react/destructuring-assignment': 'off',
    'react/jsx-filename-extension': ['warn', { 'extensions': ['.tsx', '.jsx'] }],
  },
  settings: {
    'import/resolver': {
      'node': {
        'extensions': ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  overrides: [
    {
      files: ['src/tests/**/*.js', 'src/stories/index.js', 'src/**/*.stories.jsx'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
