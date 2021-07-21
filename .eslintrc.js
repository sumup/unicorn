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
      'react/prop-types': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
    },
  },
);
