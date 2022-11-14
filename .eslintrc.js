/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    '@vue/typescript/recommended',
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
  ],
  plugins: ['prettier'],
  rules: {
    'no-unused-vars': 'warn',
    'vue/no-unused-components': 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 0,
    'vue/max-attributes-per-line': 'off',
    'vue/v-on-event-hyphenation': 'off',
    '@typescript-eslint/no-empty-interface': 0,
    'prettier/prettier': ['error'],
  },
}
