module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  // extends: ['airbnb-base'],
  // globals: {
  //   Atomics: 'readonly',
  //   SharedArrayBuffer: 'readonly',
  // },
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      impliedStrict: true,
    },
    sourceType: 'module',
  },
  extends: ['eslint:recommended'],
  ignorePatterns: ['main.js', 'node_modules/'],
  rules: {
    // 'linebreak-style': ['error', 'windows'],
    'comma-dangle': 0,
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-console': [
      'warn',
      { allow: ['clear', 'info', 'error', 'dir', 'trace'] },
    ],
    curly: 'error',
    'no-else-return': 'error',
    'no-unneeded-ternary': 'error',
    'no-useless-return': 'error',
    'no-var': 'error',
    'one-var': ['error', 'never'],
    'prefer-arrow-callback': 'error',
    strict: 'error',
    'symbol-description': 'error',
    // yoda: ['error', 'never', { exceptRange: true }],
  },
};
