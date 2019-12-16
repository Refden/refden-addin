module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
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
    '@typescript-eslint/no-explicit-any': 'off',
    'import/extensions': 'off',
    'import/order': ['error', { 'newlines-between': 'always' }],
    'no-param-reassign': ['error', { props: false }],
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
  'overrides': [
    {
      'files': ['src/tests/**/*.js', 'src/stories/index.js', 'src/**/*.stories.jsx'],
      'rules': {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
