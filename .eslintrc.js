// https://eslint.org/docs/user-guide/configuring

module.exports = {
  extends: ['airbnb-base'],
  env: {
    browser: true,
    node: true
  },
  // add your custom rules here
  rules: {
    'no-unused-vars': 0,
    'linebreak-style': 0
  },
  parser: 'babel-eslint'
};
