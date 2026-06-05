<script setup lang="ts">
import { ref } from "vue";
import { VueRecaptcha } from "vue-recaptcha";

const modelValue = defineModel<string>({ default: "" });

const emit = defineEmits<{
  error: [];
}>();

const config = useRuntimeConfig();
const siteKey = config.public.recaptchaSiteKey as string;
const colorMode = useColorMode();

const recaptchaTheme = computed(() =>
  colorMode.value === "dark" ? "dark" : "light"
);

const recaptchaRef = ref<{ reset: () => void } | null>(null);

watch(recaptchaTheme, () => {
  modelValue.value = "";
});

const onVerify = (token: string) => {
  modelValue.value = token;
};

const onExpired = () => {
  modelValue.value = "";
};

const onError = () => {
  modelValue.value = "";
  emit("error");
};

const reset = () => {
  modelValue.value = "";
  recaptchaRef.value?.reset();
};

defineExpose({ reset });
</script>

<template>
  <div v-if="siteKey" class="recaptcha-crop">
    <VueRecaptcha
      :key="recaptchaTheme"
      ref="recaptchaRef"
      :sitekey="siteKey"
      :theme="recaptchaTheme"
      language="ca-ES"
      @verify="onVerify"
      @expired="onExpired"
      @error="onError"
    />
  </div>
</template>

<style scoped>
/*
 * Crop the light padding Google leaves around the reCAPTCHA iframe.
 * https://stackoverflow.com/questions/32547219/recaptcha-dark-theme-displays-with-extra-white-space-on-edges
 */
.recaptcha-crop :deep(.g-recaptcha),
.recaptcha-crop :deep(> div) {
  overflow: hidden;
  width: 298px;
  height: 74px;
  background-color: #ffffff;
}

:global(.dark) .recaptcha-crop :deep(.g-recaptcha),
:global(.dark) .recaptcha-crop :deep(> div) {
  background-color: rgb(31, 41, 55);
}

.recaptcha-crop :deep(iframe) {
  margin: -1px 0 0 -2px;
}
</style>
