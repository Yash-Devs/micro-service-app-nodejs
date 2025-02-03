// eslint.config.js
module.exports = {
    overrides: [
      {
        files: ['src/**/*.js'],
        languageOptions: {
          globals: {
            process: 'readonly',
          },
        },
        rules: {
          'no-console': 'warn',
        },
      },
    ],
  };
  