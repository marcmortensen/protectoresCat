import { event } from "vue-gtag";

export const useGtag = () => {
  const { cookiesEnabledIds, isModalActive } = useCookieControl();
  const config = useRuntimeConfig();

  // Check if analytics is ready and consented
  const isAnalyticsReady = computed(() => {
    return (
      cookiesEnabledIds.value?.includes("g") &&
      config.public.googleAnalyticsId &&
      !isModalActive.value &&
      typeof window !== "undefined" &&
      window.gtag
    );
  });

  // Safe event tracking with consent check
  const trackEvent = (
    eventName: string,
    parameters?: Record<string, string | number>
  ) => {
    if (isAnalyticsReady.value) {
      event(eventName, parameters || {});
    }
  };

  return {
    trackEvent,
  };
};
