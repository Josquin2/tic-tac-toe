// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/styles/main.scss"],
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  nitro: {
    experimental: {
      websocket: true,
    },
  },
  modules: ["@pinia/nuxt"],
  alias: {
    pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs",
  },
});