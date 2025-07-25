export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const { cookiesEnabledIds } = useCookieControl();

  // Type declarations for Google Analytics
  type DataLayerEvent = (...args: unknown[]) => void;
  interface WindowWithDataLayer extends Window {
    dataLayer: unknown[];
    gtag?: DataLayerEvent;
  }

  // Function to load Google Analytics script
  function loadGoogleAnalyticsScript(googleAnalyticsId: string) {
    // Check if script is already loaded
    if (document.querySelector('script[src*="googletagmanager.com"]')) {
      return;
    }

    // Create and append the Google Analytics script
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
    document.head.appendChild(script);

    // Initialize gtag
    const win = window as unknown as WindowWithDataLayer;
    win.dataLayer = win.dataLayer || [];
    win.gtag = function (...args: unknown[]) {
      win.dataLayer.push(args);
    };

    win.gtag("js", new Date());
    win.gtag("config", googleAnalyticsId);
  }

  // Function to remove Google Analytics
  function removeGoogleAnalytics() {
    // Remove the script tag
    const script = document.querySelector(
      'script[src*="googletagmanager.com"]'
    );
    if (script) {
      script.remove();
    }

    // Clear cookies
    ["_ga", "_gid", "_gat"].forEach((cookie) => {
      document.cookie = `${cookie}=; Max-Age=0; path=/; domain=${location.hostname}`;
      document.cookie = `${cookie}=; Max-Age=0; path=/`;
    });

    // Stub out gtag
    const win = window as unknown as WindowWithDataLayer;
    win.gtag = function () {};
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
        loadGoogleAnalyticsScript(config.public.googleAnalyticsId);
      }

      if (previous?.includes("g") && !current?.includes("g")) {
        removeGoogleAnalytics();
      }
    },
    { deep: true }
  );

  // Check if Google Analytics should be loaded on initial load
  if (
    cookiesEnabledIds.value?.includes("g") &&
    config.public.googleAnalyticsId
  ) {
    loadGoogleAnalyticsScript(config.public.googleAnalyticsId);
  }
});
