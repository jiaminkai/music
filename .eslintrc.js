module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-unused-vars': 'off' ,
    'no-console':'off',
    'no-debugger':'off',
    'generator-star-spacing': 'off',
  }
}
