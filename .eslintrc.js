module.exports = {
  extends: ['@antfu'],
  rules: {
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    'semi': ['error', 'always'],
    '@typescript-eslint/semi': ['error', 'always'],
  },
};
