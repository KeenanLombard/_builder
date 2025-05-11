/** @format */

// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["nuxt-directus"],
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    directus: {
      url: "http://localhost:8055/",
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
