// import { createResolver } from "@nuxt/kit";
// const { resolve } = createResolver(import.meta.url);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  imports: {
    dirs: ["types"],
  },
  modules: [
    // chore
    // styling & ui
    "@nuxtjs/eslint-module",
    "nuxt-vitest",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxtjs/google-fonts",
    "nuxt-purgecss",
    "@vueuse/nuxt",
    "@vee-validate/nuxt",
  ],
  css: [
    "./assets/css/main.css",
    "@fortawesome/fontawesome-free/css/all.min.css",
  ],
  pinia: {
    storesDirs: ["stores/**"],
  },
  googleFonts: {
    families: {
      Roboto: true,
    },
  },
  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
    // Use different names for components
    componentNames: {
      Form: "VeeForm",
      Field: "VeeField",
      FieldArray: "VeeFieldArray",
      ErrorMessage: "VeeErrorMessage",
    },
  },
  // postcss: {
  //   plugins: {
  //     cssnano: {
  //       preset: "default",
  //     },
  //   },
  // },
  // purgecss: {
  //   enabled: true, // Always enable purgecss
  //   fontFace: true,
  // },
});
