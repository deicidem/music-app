import antfu from '@antfu/eslint-config'
import nuxt from './.nuxt/eslint.config.mjs'

export default antfu({
  rules: {
    'no-console': 0,
  },

}, nuxt)
