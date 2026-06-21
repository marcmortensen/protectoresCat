<script setup lang="ts">
import type { FooterColumn } from "@nuxt/ui";
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

const columns: FooterColumn[] = [
  {
    label: "Informació",
    children: [
      {
        label: "Dades obertes",
        icon: "i-lucide-book-open-text",
        to: { name: "dades-obertes" },
      },
      {
        label: "IA friendly",
        icon: "i-lucide-bot",
        href: "/llms-full.txt",
        target: "_blank",
      },
      {
        label: "Codi font",
        icon: "i-lucide-code",
        href: "https://github.com/marcmortensen/protectoresCat",
        target: "_blank",
        external: true,
      },
    ],
  },
  {
    label: "Legal",
    children: [
      {
        label: "Nota legal",
        to: { name: "nota-legal" },
        icon: "i-lucide-file-text",
      },
      {
        label: "Política de privacitat",
        to: { name: "politica-de-privacitat" },
        icon: "i-lucide-shield-check",
      },
      {
        label: "Política de cookies",
        to: { name: "politica-de-cookies" },
        icon: "i-lucide-cookie",
      },
    ],
  },
  {
    label: "Ajuda",
    children: [
      {
        label: "Preguntes freqüents",
        icon: "i-lucide-circle-question-mark",
        to: { name: "faq" },
      },
      {
        label: "Proposar una entitat",
        icon: "i-lucide-plus",
        to: { name: "suggest-organization" },
      },
      {
        label: "Contacta amb nosaltres",
        icon: "i-lucide-mail",
        href: "mailto:info@adoptar.cat",
        external: true,
      },
    ],
  },
];
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
    <main class="min-h-screen-height-header bg-gray-50 dark:bg-gray-800 pb-12">
      <slot />
    </main>

    <UFooter
      class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
    >
      <template #top>
        <UContainer>
          <UFooterColumns :columns="columns">
            <template #left>
              <div class="flex flex-col gap-2">
                <p class="text-muted text-sm">
                  Adoptar.cat © {{ new Date().getFullYear() }} — Informativa i
                  sense ànim de lucre.
                </p>
                <div class="flex gap-2">
                  <UButton
                    icon="i-lucide-cookie"
                    color="neutral"
                    variant="ghost"
                    @click="isModalActive = true"
                    class="cursor-pointer"
                    aria-label="Política de cookies"
                  />
                  <UButton
                    icon="i-lucide-mail"
                    color="neutral"
                    variant="ghost"
                    href="mailto:info@adoptar.cat"
                    aria-label="Email"
                    no-rel
                  />
                  <UButton
                    icon="i-simple-icons-github"
                    color="neutral"
                    variant="ghost"
                    href="https://github.com/marcmortensen/protectoresCat"
                    aria-label="GitHub"
                    no-rel
                  />
                </div>
              </div>
            </template>
          </UFooterColumns>
        </UContainer>
      </template>
    </UFooter>
  </div>
</template>
