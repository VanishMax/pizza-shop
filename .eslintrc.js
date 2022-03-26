module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    react: { version: 'detect' },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/resolver': {
      'eslint-import-resolver-custom-alias': {
        alias: {
          '~': './src',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  extends: ['plugin:react/recommended', 'airbnb', 'plugin:prettier/recommended'],
  plugins: ['react', '@typescript-eslint', 'import'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: './',
  },
  rules: {
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }],
    'no-undef': 0,
    'no-unused-vars': 0,
    'no-underscore-dangle': 0,
    'implicit-arrow-linebreak': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-no-useless-fragment': 0,
    'import/prefer-default-export': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
};
