<script setup lang="ts">
const { trackEvent } = useGtag();

const onClick = () => {
  if (!data.value || !data.value.org.adoptAnimalsURL) return;
  trackEvent("click_button_adopt_url", {
    event_category: "engagement",
    event_label: "Adopt button clicked",
    href: data.value.org.adoptAnimalsURL,
  });
};

const route = useRoute();

const { history } = useRouter().options;

const slug = route.params.slug;
const { data } = await useAsyncData(
  route.path,
  async () => {
    const org = await queryCollection("organizations")
      .where("slug", "=", slug)
      .first();
    const regions = await queryCollection("regions").all();
    return { org, regions };
  },
  { immediate: true }
);

const regions = computed(() => {
  return data.value?.regions.map((region) => ({
    id: region.slug,
    slug: region.slug as string,
    name: region.name,
  }));
});

const currentRegion = computed(() =>
  regions.value?.find((region) => region.id === data.value?.org.region)
);

const hasError = computed(() => data.value?.org === null);
watch(
  hasError,
  (value) => {
    if (value) {
      throw createError({
        statusCode: 500,
        statusMessage: "Organization not found",
        fatal: true,
      });
    }
  },
  { immediate: true }
);

type Org = NonNullable<typeof data.value>["org"];
type Social = NonNullable<Org["socials"]>[number]["type"];
const socialIcons: Record<Social, { icon: string; name: string }> = {
  facebook: { icon: "i-lucide-facebook", name: "Facebook" },
  instagram: { icon: "i-lucide-instagram", name: "Instagram" },
  twitter: { icon: "", name: "Twitter" },
  tiktok: { icon: "", name: "TikTok" },
};

const socials = computed(() => {
  if (!data.value?.org || !data.value?.org.socials) {
    return [];
  }
  return data.value.org.socials.map((social) => {
    return {
      type: social.type,
      name: socialIcons[social.type].name,
      url: social.url,
      icon: socialIcons[social.type].icon,
    };
  });
});

const phoneIcons: Record<"phone" | "whatsApp", { icon: string; name: string }> =
  {
    phone: { icon: "i-lucide-phone", name: "Telf" },
    whatsApp: { icon: "", name: "WhatsApp" },
  };

type Phone = {
  number: string | undefined;
  type: "phone" | "whatsApp";
};

const phones = computed(() => {
  if (!data.value?.org) {
    return [];
  }
  return (
    [
      { number: data.value.org.whatsAppPhone, type: "whatsApp" },
      { number: data.value.org.contactPhone, type: "phone" },
      { number: data.value.org.contactPhone2, type: "phone" },
    ] as Phone[]
  )
    .filter((phone) => !!phone.number)
    .map((phone) => ({
      type: phone.type,
      name: phoneIcons[phone.type].name,
      icon: phoneIcons[phone.type].icon,
      number: phone.number,
      href:
        phone.type === "phone"
          ? `tel:${phone.number}`
          : `https://api.whatsapp.com/send?phone=${phone.number}`,
    }));
});

const showidZoologicalNucleus = false;
useSeoMeta({
  ogTitle: () => `${data.value?.org.shortName} | Adoptar.cat`,
  title: () => `${data.value?.org.shortName} | Adoptar.cat`,
  description: () =>
    `Descobreix tota la informació sobre ${data.value?.org.name}, incloent-hi les seves xarxes socials, refugis, telèfons, horaris.`,
  ogDescription: () =>
    `Descobreix tota la informació sobre ${data.value?.org.name}, incloent-hi les seves xarxes socials, refugis, telèfons, horaris.`,
  twitterDescription: () =>
    `Descobreix tota la informació sobre ${data.value?.org.name}, incloent-hi les seves xarxes socials, refugis, telèfons, horaris.`,
  twitterCard: "summary_large_image",
  twitterTitle: () => `${data.value?.org.shortName} | Adoptar.cat`,
  ogImage: () =>
    data.value?.org.enabledLogoUsage
      ? getOrganizationLogoPath(data.value.org.slug)
      : undefined,
  ogImageUrl: () =>
    data.value?.org.enabledLogoUsage
      ? getOrganizationLogoPath(data.value.org.slug)
      : undefined,
  twitterImage: () =>
    data.value?.org.enabledLogoUsage
      ? getOrganizationLogoPath(data.value.org.slug)
      : undefined,
});

useSchemaOrg([
  defineOrganization({
    "@id": `https://adoptar.cat/organizations/${data.value?.org.slug}#org`,
    name: data.value?.org.shortName,
    legalName: data.value?.org.name,
    url: `https://adoptar.cat/organizations/${data.value?.org.slug}`,
    logo: data.value?.org.enabledLogoUsage
      ? getOrganizationLogoPath(data.value?.org.slug)
      : undefined,
    description: data.value?.org.description,
    email: data.value?.org.contactEmail,
    telephone: data.value?.org.contactPhone,
    address: {
      "@type": "PostalAddress",
      addressLocality: data.value?.org.municipality,
      addressRegion: currentRegion.value!.name,
      addressCountry: "ES",
    },
    sameAs: (data.value?.org.socials || []).map((social) => social.url),
  }),
]);
</script>

<template>
  <div
    v-if="!hasError || !data || !data.org"
    class="bg-white dark:bg-gray-800 p-6 max-w-4xl mx-auto rounded shadow flex flex-col gap-4"
  >
    <div class="h-7">
      <ClientOnly>
        <UButton
          icon="i-lucide-chevron-left"
          size="md"
          color="primary"
          variant="soft"
          :to="(history.state.back as string) || { name: 'organizations' }"
        />
      </ClientOnly>
    </div>

    <UAlert
      title="Recorda"
      description="Segueix les pautes marcades per l'entitat (cita prèvia, formulari d'adopcions...), i fes ús responsable de les vies de comunicació començant per les menys molestes (emails, formularis, WhatsApp...)"
      class="w-full"
      orientation="horizontal"
      color="neutral"
      variant="outline"
    />
    <article v-if="data && data.org" class="flex flex-col gap-2">
      <header
        class="flex flex-col lg:flex-row justify-start lg:justify-between gap-6 w-full h-full items-start"
      >
        <div class="flex gap-4 w-full flex-col sm:flex-row">
          <div
            class="lg:shrink-0 h-24 lg:h-48 sm:h-full w-full sm:w-auto lg:w-48 flex items-center justify-center"
          >
            <NuxtPicture
              v-if="data.org.enabledLogoUsage"
              format="avif,webp"
              :src="getOrganizationLogoPath(data.org.slug)"
              :alt="`Logo of ${data.org.name}`"
              :img-attrs="{
                class: 'h-24 sm:w-full lg:h-full lg:w-48 max-h-48',
              }"
            />
            <template v-else>
              <SvgoAnimalsCat1
                v-if="
                  data.org.animalFocus === 'cats&dogs' ||
                  data.org.animalFocus === 'cats'
                "
                :font-controlled="false"
                class="h-24 md:h-48"
              />
              <SvgoAnimalsDog5
                v-if="
                  data.org.animalFocus === 'cats&dogs' ||
                  data.org.animalFocus === 'dogs'
                "
                :font-controlled="false"
                class="h-24 md:h-48"
              />
            </template>
          </div>
          <div class="flex flex-col justify-center gap-1">
            <h1 class="text-2xl font-bold mb-1">
              {{ data.org.shortName }}
            </h1>
            <p
              v-if="data.org.name !== data.org.shortName"
              class="text-gray-600 dark:text-gray-300 italic"
            >
              {{ data.org.name }}
            </p>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-map-pin" class="size-5 shrink-0" />
              <span>{{
                `${data.org.municipality}, ${currentRegion!.name}`
              }}</span>
            </div>
            <span class="flex gap-2">
              <UBadge
                v-if="data.org.isMunicipal"
                color="neutral"
                variant="soft"
                icon="i-lucide-building"
                >Municipal</UBadge
              >
              <UBadge
                v-if="
                  data.org.animalFocus === 'cats&dogs' ||
                  data.org.animalFocus === 'dogs'
                "
                color="neutral"
                variant="soft"
                icon="i-lucide-dog"
                >Gossos</UBadge
              >
              <UBadge
                v-if="
                  data.org.animalFocus === 'cats&dogs' ||
                  data.org.animalFocus === 'cats'
                "
                color="neutral"
                variant="soft"
                icon="i-lucide-cat"
                >Gats</UBadge
              >
              <UButton
                v-if="data.org.adoptAnimalsURL"
                :href="data.org.adoptAnimalsURL"
                target="_blank"
                no-rel
                color="primary"
                icon="i-lucide-paw-print"
                label="Adopció"
                @click="onClick"
              />
            </span>
          </div>
        </div>
        <div
          class="flex lg:w-1/4 w-full items-start lg:items-center justify-start flex-col-reverse lg:flex-col gap-x-2"
        >
          <div class="flex h-24 lg:h-40">
            <RegionsMap
              v-if="regions"
              :model-value="[
                data.org.region,
                ...(data.org.additionalRegions || []),
              ]"
              :regions="regions"
              read-only
              class="w-full h-full text-gray-300 opacity-70"
            />
          </div>
          <dl class="flex lg:justify-center flex-col lg:flex-row">
            <dt class="font-semibold lg:hidden">Comarca:</dt>
            <dd class="ml-2.5 lg:ml-0">
              {{ currentRegion!.name }}
            </dd>
          </dl>
        </div>
      </header>
      <div class="flex flex-col gap-2">
        <div v-if="socials && socials.length > 0">
          <dt class="font-semibold">Xarxes socials:</dt>
          <dd class="ml-2.5">
            <ul class="flex items-center gap-2">
              <li v-for="(social, index) in socials" :key="index">
                <UButton
                  v-if="social.url"
                  :href="social.url"
                  class="text-gray-700 dark:text-gray-200"
                  target="_blank"
                  no-rel
                  size="sm"
                  color="neutral"
                  variant="outline"
                  :label="social.name"
                >
                  <template #leading>
                    <UIcon
                      v-if="social.icon"
                      :name="social.icon"
                      class="size-5 shrink-0"
                      :aria-label="social.name"
                    />
                    <SvgoSocialsTikTok
                      v-if="social.type === 'tiktok'"
                      class="size-5 shrink-0"
                    />
                    <div
                      v-if="social.type === 'twitter'"
                      class="size-3 flex items-center justify-center"
                    >
                      𝕏
                    </div>
                  </template>
                </UButton>
              </li>
            </ul>
          </dd>
        </div>

        <div v-if="phones && phones.length > 0">
          <dt class="font-semibold">
            {{ `Telèfon${phones.length === 1 ? "" : "s"}:` }}
          </dt>
          <dd class="ml-2.5">
            <ul class="flex items-center gap-2">
              <li v-for="(phone, index) in phones" :key="index">
                <UButton
                  :href="phone.href"
                  class="text-gray-700 dark:text-gray-200"
                  no-rel
                  size="sm"
                  color="neutral"
                  variant="outline"
                  :label="phone.number"
                  :target="phone.type === 'whatsApp' ? '_blank' : undefined"
                >
                  <template #leading>
                    <UIcon
                      v-if="phone.icon"
                      :name="phone.icon"
                      class="size-5 shrink-0"
                      :aria-label="phone.name"
                    />
                    <SvgoSocialsWhatsApp
                      v-if="phone.type === 'whatsApp'"
                      class="size-5 shrink-0"
                      :aria-label="phone.name"
                    />
                  </template>
                </UButton>
              </li>
            </ul>
          </dd>
        </div>

        <dl v-if="data.org.dateOfInscription" class="hidden">
          <dt class="font-semibold">Data d'inscripció:</dt>
          <dd class="ml-2.5 inline">
            {{ formatFullDate(new Date(data.org.dateOfInscription)) }}
          </dd>
        </dl>

        <dl v-if="data.org.website">
          <dt class="font-semibold">Pàgina web:</dt>
          <dd>
            <UButton
              class="text-gray-700 dark:text-gray-200"
              :href="data.org.website"
              color="primary"
              variant="link"
              no-rel
              target="_blank"
              :label="data.org.website"
            />
          </dd>
        </dl>

        <dl v-if="data.org.contactEmail">
          <dt class="font-semibold">Email:</dt>
          <dd>
            <a
              class="text-gray-700 dark:text-gray-200 hover:text-primary"
              :href="`mailto:${data.org.contactEmail}`"
              >{{ data.org.contactEmail }}</a
            >
          </dd>
        </dl>

        <dt class="font-semibold">Descripció:</dt>
        <dd class="ml-2 text-gray-700 dark:text-gray-200 flex flex-col gap-2">
          <p v-if="data.org.associativeInscriptionNumber">
            Entitat legal jurídica registrada al Registre d'entitats de
            Catalunya amb número {{ data.org.associativeInscriptionNumber }} a
            {{ data.org.municipalityInscription }} el
            {{ formatFullDate(new Date(data.org.dateOfInscription!)) }}.
          </p>
          <p>
            {{ data.org.description }}
          </p>
        </dd>
        <div v-if="data.org.idZoologicalNucleus && showidZoologicalNucleus">
          <dt class="font-semibold">Núm. zoològic:</dt>
          <dd class="ml-2.5">
            {{ data.org.idZoologicalNucleus }}
          </dd>
        </div>
      </div>
      <div v-if="data.org.shelter && data.org.shelter.length > 0">
        <div class="font-semibold">
          {{ data.org.shelter.length === 1 ? "Refugi:" : "Refugis:" }}
        </div>
        <ul class="divide-y">
          <li
            v-for="(shelter, index) in data.org.shelter"
            :key="index"
            class="flex flex-col justify-center gap-1 p-2"
          >
            <div class="flex items-center gap-1.5 px-2.5 py-1.5">
              <UIcon name="i-lucide-building" class="size-5 shrink-0" />
              <span class="flex text-gray-700 dark:text-gray-200">
                {{ shelter.adress }}
              </span>
            </div>
            <div
              class="flex items-start sm:items-center gap-4 flex-col sm:flex-row xl:gap-8"
            >
              <UButton
                v-if="shelter.phone"
                class="text-gray-700 dark:text-gray-200"
                :href="`tel:${shelter.phone}`"
                icon="i-lucide-phone"
                color="primary"
                variant="link"
                no-rel
                :label="shelter.phone"
              />
              <UButton
                v-if="shelter.googleMapsLink"
                class="text-gray-700 dark:text-gray-200"
                :href="shelter.googleMapsLink"
                icon="i-lucide-map-pin"
                color="primary"
                variant="link"
                no-rel
                target="_blank"
                label="Google Maps"
              />
              <UButton
                v-if="shelter.openingHoursURL"
                class="text-gray-700 dark:text-gray-200"
                :href="shelter.openingHoursURL"
                icon="i-lucide-clock"
                color="primary"
                variant="link"
                no-rel
                target="_blank"
                label="Horari"
              />
            </div>
          </li>
        </ul>
      </div>

      <div class="pt-2">
        <time :datetime="data.org.lastUpdate" class="italic"
          >Última actualització
          {{ formatTextDate(new Date(data.org.lastUpdate)) }}</time
        >
      </div>
    </article>
  </div>
</template>
