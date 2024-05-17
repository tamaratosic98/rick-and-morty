module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['plugin:react-hooks/recommended', '@fwwgroup/react'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      {
        allowConstantExport: true,
      },
    ],
    'no-magic-numbers': 'off',
    '@typescript-eslint/no-magic-numbers': 'off',
    'no-unused-vars': 'error',
    indent: ['warn', 2, { ignoredNodes: ['SwitchCase', 'CallExpression'], offsetTernaryExpressions: true }],
    'func-call-spacing': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        functions: false,
      },
    ],
    quotes: ['error', 'single'],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'never',
        functions: 'never',
      },
    ],
    'max-len': [
      'error',
      {
        code: 120,
        ignoreStrings: true,
        ignoreComments: true,
      },
    ],
    'react-hooks/exhaustive-deps': 'warn',
  },
};
