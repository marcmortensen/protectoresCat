import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import content from "@originjs/vite-plugin-content";
import tailwindcss from "@tailwindcss/vite";

function getOrganizationPrerenderRoutes(rootDir: string): string[] {
  const contentDir = join(rootDir, "content/organizations");
  const routes: string[] = [];

  for (const file of readdirSync(contentDir)) {
    if (!file.endsWith(".json")) continue;

    const raw = readFileSync(join(contentDir, file), "utf-8");
    const org = JSON.parse(raw) as { slug?: string; isActive?: boolean };

    if (org.isActive !== false && org.slug) {
      routes.push(`/organizations/${org.slug}`);
    }
  }

  return routes;
}

function isOrganizationsFilterPrerenderPath(path: string): boolean {
  const [pathname] = path.split("?");
  return pathname === "/organizations" && path.includes("?");
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || "https://adoptar.cat",
    name: "Adopta a Catalunya",
    defaultLocale: "ca",
  },
  runtimeConfig: {
    public: {
      googleAnalyticsId: process.env.NUXT_PUBLIC_GOOGLE_ANALYTICS_ID,
      web3formsAccessKey: process.env.NUXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
    },
  },
  devtools: { enabled: true },
  typescript: {
    typeCheck: true,
  },
  modules: [
    "@nuxtjs/seo",
    "nuxt-ai-ready",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/content",
    "@nuxt/ui",
    "@vueuse/nuxt",
    "nuxt-svgo",
    "@dargmuesli/nuxt-cookie-control",
    "nuxt-security",
  ],

  vite: {
    plugins: [tailwindcss(), content({ xml: { enabled: true } })],
  },
  css: ["~/assets/css/main.css"],
  compatibilityDate: "2024-11-01",
  content: {
    experimental: {
      sqliteConnector: "native",
    },
  },
  experimental: {
    inlineRouteRules: true,
  },
  seo: {
    meta: {
      twitterCard: "summary_large_image",
      ogImage: "/logo_w1200_h630.png",
    },
  },
  ogImage: {
    enabled: false,
  },
  sitemap: {
    sources: ["/__sitemap__/organizations"],
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
      titleTemplate: "%s | Adoptar.cat",
      title: "Adopta a Catalunya",
      htmlAttrs: {
        lang: "ca",
      },
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/sitemap.xml", "/robots.txt", "/organizations"],
      ignore: [isOrganizationsFilterPrerenderPath],
    },
  },
  hooks: {
    "nitro:config"(nitroConfig) {
      const rootDir = nitroConfig.rootDir ?? process.cwd();
      const orgRoutes = getOrganizationPrerenderRoutes(rootDir);

      nitroConfig.prerender = nitroConfig.prerender ?? {};
      nitroConfig.prerender.routes = [
        ...(Array.isArray(nitroConfig.prerender.routes)
          ? nitroConfig.prerender.routes
          : []),
        ...orgRoutes,
      ];
    },
  },
  routeRules: {
    "/**": { prerender: true },
    "/api/**": { prerender: false },
  },
  security: {
    headers: {
      permissionsPolicy: {
        geolocation: ["self"],
      },
      //https://github.com/nuxt/content/issues/2992
      contentSecurityPolicy: {
        "script-src": [
          "'self'",
          "https:",
          "'unsafe-inline'",
          "'strict-dynamic'",
          "'nonce-{{nonce}}'",
          "'wasm-unsafe-eval'",
          "https://hcaptcha.com",
          "https://*.hcaptcha.com",
        ],
        "connect-src": [
          "'self'",
          "https://api.web3forms.com",
          "https://hcaptcha.com",
          "https://*.hcaptcha.com",
          "https://api.iconify.design",
          "https://www.google-analytics.com",
          "https://*.google-analytics.com",
          "https://analytics.google.com",
          "https://eines.icgc.cat/geocodificador/invers",
        ],
        "frame-src": [
          "'self'",
          "https://hcaptcha.com",
          "https://*.hcaptcha.com",
        ],
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
