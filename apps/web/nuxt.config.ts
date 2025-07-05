import content from "@originjs/vite-plugin-content";
import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  future: {
    compatibilityVersion: 4,
  },
  runtimeConfig: {
    public: {
      site: {
        url: "https://adoptar.cat",
        name: "Adopta a Catalunya",
      },
      googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
    },
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
    "@nuxtjs/sitemap",
    "@nuxt/content",
    "@nuxt/ui",
    "@vueuse/nuxt",
    "nuxt-svgo",
    "@dargmuesli/nuxt-cookie-control",
    "nuxt-schema-org",
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
  experimental: {
    viewTransition: true,
  },
  app: {
    head: {
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon-96x96.png",
          sizes: "96x96",
        },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "shortcut icon", href: "/favicon.ico" },
        {
          rel: "apple-touch-icon",
          type: "image/png",
          href: "/apple-touch-icon.png",
          sizes: "180x180",
        },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
      meta: [{ name: "apple-mobile-web-app-title", content: "Adopta" }],
      title: "Adopta a Catalunya",
      htmlAttrs: {
        lang: "ca",
      },
    },
  },
  cookieControl: {
    isControlButtonEnabled: false,
    locales: ["ca"],
    colors: {
      checkboxActiveBackground: "#dc842a",
    },
    cookies: {
      optional: [
        {
          description: {
            ca: "Aquesta galeta és necessària per Google Analytics. Si no l'acceptes, no podrem recopilar dades sobre el teu ús del lloc web.",
          },
          name: {
            ca: "Google Analytics",
          },
          id: "g",
          targetCookieIds: ["_ga", "_gat", "_gid"],
          src: `https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`,
        },
      ],
      necessary: [
        {
          description: {
            ca: "Aquesta galeta és necessària guardar les teves preferències de galetes.",
          },
          name: {
            ca: "Preferències",
          },
          links: {
            "https://adoptar.cat/politica-de-cookies": "Política de cookies",
            "https://adoptar.cat/politica-de-privacitat":
              "Política de privacitat",
            "https://adoptar.cat/nota-legal": "Avís legal",
          },

          id: "p",
          targetCookieIds: ["ncc_c", "ncc_e"],
        },
      ],
    },
  },
});
