const CACHE_NAME = "adoptar-cache-v1";

// Static assets to cache on install
const STATIC_ASSETS = [
  "/",
  "/site.webmanifest",
  "/favicon.ico",
  "/favicon.svg",
  "/apple-touch-icon.png",
  "/web-app-manifest-192x192.png",
  "/web-app-manifest-512x512.png",
];

// Install: cache static assets
self.addEventListener("install", (event) => {
  console.log("[SW] Installing service worker");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS).catch((err) => {
          console.warn("[SW] Some static assets failed to cache:", err);
          // Don't fail installation if some assets fail
        });
      })
      .then(() => {
        return self.skipWaiting(); // Activate immediately
      })
  );
});

// Activate: clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[SW] Activating service worker");
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => {
              console.log("[SW] Deleting old cache:", name);
              return caches.delete(name);
            })
        );
      })
      .then(() => {
        return self.clients.claim(); // Take control of all pages
      })
  );
});

// Fetch: smart caching strategy
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") {
    return;
  }

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  event.respondWith(
    (async () => {
      // Strategy 1: Cache-first for static assets (icons, images, manifest)
      if (
        url.pathname.startsWith("/favicon") ||
        url.pathname.startsWith("/apple-touch-icon") ||
        url.pathname.startsWith("/web-app-manifest") ||
        url.pathname.startsWith("/site.webmanifest") ||
        url.pathname.startsWith("/organizationLogos/") ||
        url.pathname.match(/\.(png|jpg|jpeg|webp|svg|ico)$/i)
      ) {
        const cached = await caches.match(request);
        if (cached) {
          return cached;
        }
        try {
          const response = await fetch(request);
          if (response.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, response.clone());
          }
          return response;
        } catch (error) {
          console.error("[SW] Fetch failed for static asset:", error);
          return new Response("Offline", { status: 503 });
        }
      }

      // Strategy 2: Cache-first for Nuxt assets (hashed, versioned files)
      if (url.pathname.startsWith("/_nuxt/")) {
        const cached = await caches.match(request);
        if (cached) {
          // Serve from cache, but update in background
          fetch(request)
            .then((response) => {
              if (response.ok) {
                caches.open(CACHE_NAME).then((cache) => {
                  cache.put(request, response.clone());
                });
              }
            })
            .catch(() => {
              // Ignore background update failures
            });
          return cached;
        }
        try {
          const response = await fetch(request);
          if (response.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, response.clone());
          }
          return response;
        } catch (error) {
          console.error("[SW] Fetch failed for Nuxt asset:", error);
          return new Response("Offline", { status: 503 });
        }
      }

      // Strategy 3: Network-first for HTML and API-like requests
      // This ensures fresh content when online, but works offline too
      try {
        const networkResponse = await fetch(request);

        // Cache successful responses (HTML pages, API responses)
        if (networkResponse.ok) {
          const cache = await caches.open(CACHE_NAME);
          // Clone the response before caching (streams can only be read once)
          cache.put(request, networkResponse.clone());
        }

        return networkResponse;
      } catch (error) {
        console.log("[SW] Network request failed, trying cache:", url.pathname);

        // Fallback to cache if network fails
        const cached = await caches.match(request);
        if (cached) {
          return cached;
        }

        // Fallback: for navigation requests, serve index.html
        if (request.mode === "navigate") {
          const indexCache = await caches.match("/");
          if (indexCache) {
            return indexCache;
          }
        }

        // Last resort: return offline message
        return new Response("Offline - No cached version available", {
          status: 503,
          headers: { "Content-Type": "text/plain" },
        });
      }
    })()
  );
});
