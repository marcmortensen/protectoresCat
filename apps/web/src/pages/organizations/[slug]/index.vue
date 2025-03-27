<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const { history } = useRouter().options;

const slug = route.params.slug;
const { data } = await useAsyncData(
  route.path,
  async () => {
    const org = await queryCollection("organizations")
      .where("slug", "=", slug)
      .first();

    return { org };
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <button @click="history.state.back ? router.back() : navigateTo('/')">
      Go back
    </button>
    <pre v-if="data && data.org">{{ data.org.shortName }}</pre>
    <pre v-else>ERROROROR</pre>
  </div>
</template>
