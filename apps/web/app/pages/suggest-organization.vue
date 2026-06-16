<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import type { OrganizationsCollectionItem } from "@nuxt/content";
import { z } from "zod";
import {
  ANIMAL_FOCUS_OPTIONS,
  animalFocusSchema,
  DEFAULT_ANIMAL_FOCUS,
  DEFAULT_PROVINCE,
  PROVINCE_OPTIONS,
  provinceSchema,
  type ProvinceSlug,
} from "~/utils/organizationConstants";
import { parseSuggestOrganizationQuery } from "~/utils/suggestOrganizationQuery";

const route = useRoute();
const router = useRouter();

const optionalUrlField = z
  .string()
  .trim()
  .refine((value) => value === "" || z.url().safeParse(value).success, {
    message: "URL no vàlida",
  });

const organizationSuggestFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "El nom és obligatori")
      .max(200, "El nom és massa llarg"),
    animalFocus: animalFocusSchema,
    province: provinceSchema,
    website: optionalUrlField.optional().default(""),
    facebook: optionalUrlField.optional().default(""),
    instagram: optionalUrlField.optional().default(""),
    tiktok: optionalUrlField.optional().default(""),
    twitter: optionalUrlField.optional().default(""),
  })
  .refine(
    (data) =>
      [
        data.website,
        data.facebook,
        data.instagram,
        data.tiktok,
        data.twitter,
      ].some((url) => url && url.trim() !== ""),
    {
      message: "Cal proporcionar almenys un enllaç (web o xarxes socials)",
      path: ["website"],
    }
  );

type OrganizationSuggestForm = z.infer<typeof organizationSuggestFormSchema>;

const defaultState = (): OrganizationSuggestForm => ({
  name: "",
  animalFocus: DEFAULT_ANIMAL_FOCUS,
  province: DEFAULT_PROVINCE,
  website: "",
  facebook: "",
  instagram: "",
  tiktok: "",
  twitter: "",
});

const config = useRuntimeConfig();
const state = reactive<OrganizationSuggestForm>(defaultState());

const isSubmitting = ref(false);
const submitError = ref<string | null>(null);
const successModalOpen = ref(false);
const hCaptchaToken = ref<string | null>(null);
const hcaptchaRef = ref<{ reset: () => void } | null>(null);
const duplicateMatches = ref<{ shortName: string; municipality: string }[]>([]);

const { data: allOrgs } = useAsyncData("suggest-org-orgs", () =>
  queryCollection("organizations").all()
);

const isDuplicateOrg = (
  org: OrganizationsCollectionItem,
  name: string,
  province: ProvinceSlug
) => {
  if (org.isActive === false || org.province !== province) {
    return false;
  }

  const orgName = org.name.toLowerCase();
  const shortName = org.shortName.toLowerCase();
  return orgName === name || shortName === name || orgName.includes(name);
};

const checkDuplicateName = () => {
  duplicateMatches.value = [];
  const name = state.name.trim().toLowerCase();
  if (!name || !allOrgs.value) {
    return;
  }

  duplicateMatches.value = allOrgs.value
    .filter((org) => isDuplicateOrg(org, name, state.province))
    .map((org) => ({
      shortName: org.shortName,
      municipality: org.municipality,
    }));
};

watch(
  () => state.province,
  () => {
    if (state.name.trim()) {
      checkDuplicateName();
    } else {
      duplicateMatches.value = [];
    }
  }
);

onMounted(() => {
  const { name, province } = parseSuggestOrganizationQuery(route.query);
  if (province) {
    state.province = province;
  }
  if (name) {
    state.name = name;
    checkDuplicateName();
  }
});

function closeSuccessModal() {
  successModalOpen.value = false;
  if (Object.keys(route.query).length > 0) {
    router.replace({ path: route.path, query: {} });
  }
}

async function onSubmit(_event: FormSubmitEvent<OrganizationSuggestForm>) {
  submitError.value = null;

  if (!hCaptchaToken.value) {
    submitError.value = "Completa la verificació de seguretat";
    return;
  }

  if (!config.public.web3formsAccessKey) {
    submitError.value =
      "El formulari no està configurat correctament. Contacta amb l'administrador.";
    return;
  }

  isSubmitting.value = true;

  try {
    const result = await $fetch<{ success: boolean; message?: string }>(
      "https://api.web3forms.com/submit",
      {
        method: "POST",
        body: {
          access_key: config.public.web3formsAccessKey,
          subject: `Nova proposta: ${state.name.trim()}`,
          from_name: "Adoptar.cat formulari",
          "h-captcha-response": hCaptchaToken.value,
          name: state.name.trim(),
          animal_focus: state.animalFocus,
          province: state.province,
          website: state.website.trim() || undefined,
          facebook: state.facebook.trim() || undefined,
          instagram: state.instagram.trim() || undefined,
          tiktok: state.tiktok.trim() || undefined,
          twitter: state.twitter.trim() || undefined,
        },
      }
    );

    if (!result.success) {
      throw new Error(
        result.message ?? "No s'ha pogut enviar la proposta. Torna-ho a provar."
      );
    }

    Object.assign(state, defaultState());
    hCaptchaToken.value = null;
    hcaptchaRef.value?.reset();
    duplicateMatches.value = [];
    successModalOpen.value = true;
  } catch (error: unknown) {
    hcaptchaRef.value?.reset();
    hCaptchaToken.value = null;

    if (error instanceof Error && error.message) {
      submitError.value = error.message;
    } else if (
      error &&
      typeof error === "object" &&
      "statusMessage" in error &&
      typeof (error as { statusMessage: unknown }).statusMessage === "string"
    ) {
      submitError.value = (error as { statusMessage: string }).statusMessage;
    } else {
      submitError.value =
        "No s'ha pogut enviar la proposta. Torna-ho a provar.";
    }
  } finally {
    isSubmitting.value = false;
  }
}

useAppSeo({
  title: "Afegeix una entitat",
  description:
    "Proposa una entitat d'adopció d'animals que no apareix al llistat d'Adoptar.cat.",
  canonical: "/suggest-organization",
});

defineRouteRules({
  sitemap: {
    lastmod: "2026-06-16T00:00:00.000Z",
    changefreq: "yearly",
    priority: 0.4,
  },
});
</script>

<template>
  <div
    class="bg-white dark:bg-gray-800 p-6 max-w-4xl mx-auto rounded shadow flex flex-col gap-6"
  >
    <div class="flex flex-col gap-2">
      <h1 class="text-2xl font-title">Proposar una entitat</h1>
      <p class="text-gray-600 dark:text-gray-300">
        Si coneixes una entitat que permet adopcions i que no és al nostre
        llistat, omple aquest formulari. Revisarem la proposta i, si procedeix,
        l'afegirem al recull.
      </p>
    </div>
    <UAlert
      v-if="submitError"
      color="error"
      variant="subtle"
      title="Error en enviar"
      :description="submitError ?? undefined"
    />

    <UModal
      v-model:open="successModalOpen"
      :dismissible="false"
      :close="false"
      title="🎉 Proposta enviada"
      description="Gràcies! Hem rebut la teva proposta. Revisarem la informació i, si procedeix, l'afegirem al recull."
      :ui="{
        title: 'text-xl font-semibold',
        description: 'mt-2 text-base text-gray-600 dark:text-gray-300',
      }"
    >
      <template #footer>
        <UButton
          label="Tancar"
          variant="outline"
          color="neutral"
          @click="closeSuccessModal"
        />
      </template>
    </UModal>

    <UForm
      :schema="organizationSuggestFormSchema"
      :state="state"
      class="flex flex-col gap-5"
      @submit="onSubmit"
    >
      <div class="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-4">
        <UFormField label="Nom de l'entitat" name="name" required>
          <UInput
            v-model="state.name"
            placeholder="Nom complet de l'entitat"
            class="w-full"
            maxlength="200"
            @blur="checkDuplicateName"
          />
        </UFormField>

        <UFormField label="Centrada en" name="animalFocus" required>
          <USelectMenu
            v-model="state.animalFocus"
            :items="ANIMAL_FOCUS_OPTIONS"
            value-key="value"
            label-key="label"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Província" name="province" required>
          <USelectMenu
            v-model="state.province"
            :items="PROVINCE_OPTIONS"
            value-key="value"
            label-key="label"
            class="w-full"
          />
        </UFormField>
      </div>

      <UAlert v-if="duplicateMatches.length" color="neutral" variant="subtle">
        <template #description>
          <p>
            {{
              duplicateMatches.length === 1
                ? "Ja existeix una entitat similar:"
                : "Ja existeixen entitats similars:"
            }}
          </p>
          <ul class="list-disc list-inside mt-1">
            <li v-for="match in duplicateMatches" :key="match.shortName">
              {{ `${match.shortName} (${match.municipality})` }}
            </li>
          </ul>
          <p class="mt-1">
            Pots enviar la proposta igualment si es tracta d'una entitat
            diferent.
          </p>
        </template>
      </UAlert>

      <div class="flex flex-col gap-4">
        <p class="font-medium">Enllaços</p>
        <p class="text-sm text-gray-600 dark:text-gray-400 -mt-2">
          Cal proporcionar almenys un enllaç (lloc web o xarxes socials).
        </p>

        <UFormField label="Lloc web" name="website">
          <UInput
            v-model="state.website"
            type="url"
            placeholder="https://..."
            class="w-full"
          />
        </UFormField>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <UFormField label="Facebook" name="facebook">
            <UInput
              v-model="state.facebook"
              type="url"
              placeholder="https://www.facebook.com/..."
              class="w-full"
            />
          </UFormField>

          <UFormField label="Instagram" name="instagram">
            <UInput
              v-model="state.instagram"
              type="url"
              placeholder="https://www.instagram.com/..."
              class="w-full"
            />
          </UFormField>

          <UFormField label="TikTok" name="tiktok">
            <UInput
              v-model="state.tiktok"
              type="url"
              placeholder="https://www.tiktok.com/..."
              class="w-full"
            />
          </UFormField>

          <UFormField label="Twitter / X" name="twitter">
            <UInput
              v-model="state.twitter"
              type="url"
              placeholder="https://x.com/..."
              class="w-full"
            />
          </UFormField>
        </div>
      </div>

      <FieldHcaptcha ref="hcaptchaRef" v-model="hCaptchaToken" />

      <UButton
        type="submit"
        label="Enviar proposta"
        :loading="isSubmitting"
        :disabled="isSubmitting"
        class="self-start"
      />
    </UForm>
  </div>
</template>
