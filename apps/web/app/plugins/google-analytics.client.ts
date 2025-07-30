import { createGtag, optIn, optOut } from "vue-gtag";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const { cookiesEnabledIds } = useCookieControl();

  let gtagInitialized = false;
  let gtagPlugin: ReturnType<typeof createGtag> | null = null;

  // Function to initialize Google Analytics with vue-gtag
  function initializeGoogleAnalytics() {
    if (!config.public.googleAnalyticsId || gtagInitialized || window.gtag) {
      return;
    }
    const nuxtApp = useNuxtApp();
    if (nuxtApp.vueApp) {
      gtagPlugin = createGtag({
        tagId: config.public.googleAnalyticsId,
      });

      gtagPlugin(nuxtApp.vueApp);
      gtagInitialized = true;
    }
  }

  // Function to enable Google Analytics
  function enableGoogleAnalytics() {
    if (!config.public.googleAnalyticsId) {
      return;
    }

    // Initialize if not already done
    if (!gtagInitialized) {
      initializeGoogleAnalytics();
    }

    // Use vue-gtag optIn to enable tracking
    optIn(config.public.googleAnalyticsId);
  }

  // Function to disable Google Analytics using vue-gtag optOut
  function disableGoogleAnalytics() {
    if (!config.public.googleAnalyticsId) {
      return;
    }

    // Use vue-gtag optOut to disable tracking
    optOut(config.public.googleAnalyticsId);

    // Clear cookies
    ["_ga", "_gid", "_gat"].forEach((cookie) => {
      document.cookie = `${cookie}=; Max-Age=0; path=/; domain=${location.hostname}`;
      document.cookie = `${cookie}=; Max-Age=0; path=/`;
    });
  }

  // Watch for cookie consent changes
  watch(
    () => cookiesEnabledIds.value,
    (current, previous) => {
      if (
        !previous?.includes("g") &&
        current?.includes("g") &&
        config.public.googleAnalyticsId
      ) {
        // Small delay to ensure cookie control is fully initialized
        setTimeout(() => {
          enableGoogleAnalytics();
        }, 50);
      }

      if (previous?.includes("g") && !current?.includes("g")) {
        disableGoogleAnalytics();
      }
    },
    { deep: true }
  );

  if (
    cookiesEnabledIds.value?.includes("g") &&
    config.public.googleAnalyticsId
  ) {
    // Small delay to ensure cookie control is fully initialized
    setTimeout(() => {
      enableGoogleAnalytics();
    }, 50);
  }
});
