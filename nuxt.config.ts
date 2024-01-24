// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    // chore
    "@nuxtjs/eslint-module", // styling & ui
    "@pinia/nuxt",
    "nuxt-vitest",
    "@nuxtjs/tailwindcss",
  ],
  css: ["./assets/css/main.css"],
});
