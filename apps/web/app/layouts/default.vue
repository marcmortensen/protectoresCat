<script setup lang="ts">
const mobileMenuOpen = ref(false);

const { isModalActive } = useCookieControl();

const navigation = [
  { label: "Inici", to: { name: "index" } },
  { label: "Entitats", to: { name: "organizations" } },
  { label: "Preguntes freqüents", to: { name: "faq" } },
];

const hasScrolled = ref(false);

// Track scroll position of the window
const { y } = useScroll(window);

// Watch the scroll position to detect if the user has scrolled
watchEffect(() => {
  hasScrolled.value = y.value > 0; // Set to true if scrolled down
});

const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(_isDark) {
    colorMode.preference = _isDark ? "dark" : "light";
  },
});
</script>
<template>
  <div class="relative">
    <header
      :class="hasScrolled ? 'shadow-sm' : 'border-b dark:border-white'"
      class="inset-x-0 top-0 z-50 sticky bg-white dark:bg-gray-900 transition-shadow duration-300"
    >
      <nav
        class="flex items-center justify-between py-1 h-header gap-7"
        aria-label="Global"
      >
        <div
          class="xl:absolute xl:top-0 xl:left-2 block ml-3 xl:ml-0 bg-white dark:bg-gray-900 transition-normal duration-200"
          :class="hasScrolled ? '' : 'xl:p-4 xl:rounded-full xl:border'"
        >
          <NuxtLink :to="{ name: 'index' }">
            <span class="sr-only">Adoptar.cat</span>
            <SvgoLogo
              filled
              :font-controlled="false"
              class="w-auto h-14 hover:text-red-400 text-[#D3B99E] transition-all duration-300 active:text-red-400"
              :class="hasScrolled ? 'xl:h-14' : 'xl:h-20'"
              alt="logo"
            />
          </NuxtLink>
        </div>
        <div class="flex lg:hidden pr-3 xl:p-0">
          <UButton
            variant="outline"
            icon="i-lucide-menu"
            size="lg"
            @click="mobileMenuOpen = true"
          />
        </div>
        <div class="hidden">
          <NuxtLink
            v-for="item in navigation"
            :key="item.label"
            :to="item.to"
            class="text-sm/6 font-semibold text-gray-900 hover:text-primary"
            active-class="text-primary"
            >{{ item.label }}</NuxtLink
          >
        </div>
        <div
          class="hidden lg:ml-30 lg:flex lg:flex-1 lg:justify-center lg:gap-5 text-black dark:text-white"
        >
          <NuxtLink
            v-for="item in navigation"
            :key="item.label"
            :to="item.to"
            active-class="text-primary"
            class="text-sm/6 font-semibold hover:text-primary"
            >{{ item.label }}</NuxtLink
          >
        </div>

        <div
          class="hidden pr-3 xl:p-0 max-w-header dark:text-white text-black w-header items-center lg:flex justify-center"
        >
          <ClientOnly>
            <UButton
              class="dark:text-white text-black hover:text-primary cursor-pointer"
              :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
              size="xl"
              variant="link"
              color="primary"
              @click="isDark = !isDark"
            />
          </ClientOnly>
        </div>
      </nav>
      <USlideover
        v-if="mobileMenuOpen"
        v-model:open="mobileMenuOpen"
        class="lg:hidden"
        title="Menú"
      >
        <template #body>
          <div class="flex flex-col text-gray-900 dark:text-white">
            <NuxtLink
              v-for="item in navigation"
              :key="item.label"
              :to="item.to"
              class="hover:text-primary border-b border-(--ui-border) last:border-b-0 font-medium text-sm py-3.5"
              active-class="text-primary"
              @click="mobileMenuOpen = false"
              >{{ item.label }}</NuxtLink
            >
          </div>
        </template>
        <template #footer>
          <div class="w-full flex items-center justify-center">
            <USwitch
              :default-value="!isDark"
              unchecked-icon="i-lucide-moon"
              checked-icon="i-lucide-sun"
              size="xl"
              @click="isDark = !isDark"
            />
          </div>
        </template>
      </USlideover>
    </header>
    <main class="min-h-screen-height-header bg-gray-50 dark:bg-gray-800">
      <slot />
    </main>
    <footer
      class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div
          class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div
            class="text-xs text-gray-400 dark:text-white text-left sm:text-right mt-2 sm:mt-0 px-2.5 py-1.5"
          >
            Adoptar.cat © {{ new Date().getFullYear() }} — Informativa i sense
            ànim de lucre
          </div>
          <div
            class="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 text-sm"
          >
            <UButton
              class="text-gray-600 dark:text-white hover:text-primary"
              variant="link"
              label="Nota legal"
              :to="{ name: 'nota-legal' }"
            />
            <UButton
              class="text-gray-600 dark:text-white hover:text-primary"
              variant="link"
              label="Política de privacitat"
              :to="{ name: 'politica-de-privacitat' }"
            />
            <UButton
              class="text-gray-600 dark:text-white hover:text-primary"
              variant="link"
              label="Política de cookies"
              :to="{ name: 'politica-de-cookies' }"
            />
            <UButton
              class="text-gray-600 dark:text-white hover:text-primary"
              variant="link"
              label="Configuració de cookies"
              @click="isModalActive = true"
            />
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
