<script setup lang="ts">
import HCaptcha from "@hcaptcha/vue3-hcaptcha";

const WEB3FORMS_HCAPTCHA_SITEKEY = "50b2fe65-b00b-4b9e-ad62-3ba471098be2";
const token = defineModel<string | null>({ default: null });
const hcaptchaRef = ref<InstanceType<typeof HCaptcha> | null>(null);

defineExpose({ reset: () => hcaptchaRef.value?.reset() });
</script>

<template>
  <HCaptcha
    ref="hcaptchaRef"
    :sitekey="WEB3FORMS_HCAPTCHA_SITEKEY"
    :re-captcha-compat="false"
    @verify="(t: string) => (token = t)"
    @expired="token = null"
    @error="token = null"
  />
</template>
