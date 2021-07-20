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
    },
  },
);
