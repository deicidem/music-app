// import { createResolver } from "@nuxt/kit";
// const { resolve } = createResolver(import.meta.url);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    // chore
    "@nuxtjs/eslint-module", // styling & ui

    "nuxt-vitest",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxtjs/google-fonts",
    "nuxt-purgecss",
    "@vueuse/nuxt",
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
