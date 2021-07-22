module.exports = require('@sumup/foundry/eslint')(
  {
    language: 'TypeScript',
    environments: ['Browser'],
    frameworks: ['React', 'Emotion'],
    openSource: false,
  },
  {
    rules: {
      '@typescript-eslint/no-shadow': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      'react/prop-types': 'off',
      'no-unused-vars': 'off',
      'react/react-in-jsx-scope': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
    },
  },
);
