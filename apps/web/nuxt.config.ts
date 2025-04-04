import content from "@originjs/vite-plugin-content";
import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  devtools: { enabled: true },

  typescript: {
    typeCheck: true,
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/content",
    "@nuxt/ui",
    "@vueuse/nuxt",
    "nuxt-svgo",
  ],

  vite: {
    plugins: [
      tailwindcss(),
      content({
        xml: {
          enabled: true,
        },
      }),
    ],
  },
  css: ["~/assets/css/main.css"],
  compatibilityDate: "2024-11-01",
});
