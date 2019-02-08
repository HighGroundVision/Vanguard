module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: ["plugin:vue/essential", "@vue/prettier"],

  plugins: [
    'html'
  ],

  rules: {
    'no-trailing-spaces': 0,
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/no-use-v-if-with-v-for': 'off',
    'vue/require-v-for-key': 'off'
  },

  parserOptions: {
    parser: 'babel-eslint'
  },

  'extends': [
    'plugin:vue/essential',
    '@vue/prettier'
  ]
};
