<script setup lang="ts">
const config = useRuntimeConfig();

const { cookiesEnabledIds } = useCookieControl();

watch(
  () => cookiesEnabledIds.value,
  (current, previous) => {
    console.log("cookiesEnabledIds", current, previous);
    if (
      !previous?.includes("g") &&
      current?.includes("g") &&
      config.public.googleAnalyticsId
    ) {
      initGoogleAnalytics(config.public.googleAnalyticsId);
    }
    if (previous?.includes("g") && !current?.includes("g")) {
      removeGoogleAnalytics();
    }
  },
  { deep: true }
);

function initGoogleAnalytics(googleAnalyticsId: string) {
  // Ensure window.dataLayer exists and is typed
  type DataLayerEvent = (...args: unknown[]) => void;
  interface WindowWithDataLayer extends Window {
    dataLayer: unknown[];
    gtag?: DataLayerEvent;
  }
  const win = window as unknown as WindowWithDataLayer;
  win.dataLayer = win.dataLayer || [];

  win.gtag = function (...args: unknown[]) {
    win.dataLayer.push(args);
  };

  win.gtag("js", new Date());
  win.gtag("config", googleAnalyticsId);
}

function removeGoogleAnalytics() {
  ["_ga", "_gid", "_gat"].forEach((cookie) => {
    document.cookie = `${cookie}=; Max-Age=0; path=/; domain=${location.hostname}`;
    document.cookie = `${cookie}=; Max-Age=0; path=/`;
  });

  type DataLayerEvent = (...args: unknown[]) => void;
  interface WindowWithDataLayer extends Window {
    dataLayer: unknown[];
    gtag?: DataLayerEvent;
  }
  const win = window as unknown as WindowWithDataLayer;
  // Stub out gtag so it does nothing
  win.gtag = function () {};
}

useSeoMeta({
  title: "Troba i adopta | Adoptar.cat",
  description:
    "Descobreix totes les entitats que permeten adopcions. Entra a la nostra plana web i escull per tipus o per comarques.",
  robots: "index, follow, noimageindex",
});
</script>

<template>
  <UApp>
    <CookieControl locale="ca" />
    <NuxtLayout class="font-display">
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
