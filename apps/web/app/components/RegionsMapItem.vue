<template>
  <NuxtLink
    v-if="route && !readOnly"
    :to="route"
    :title="region ? region.name : undefined"
  >
    <g>
      <path :d="d" :class="styleClass" v-on="on" />
    </g>
  </NuxtLink>
  <g v-else>
    <path :d="d" :class="styleClass" v-on="on" />
  </g>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { RouteLocationRaw } from "vue-router";

const props = defineProps<{
  selectedRegion?: string | null;
  hoveredRegion?: string | null;
  d: string;
  region?: {
    id: string;
    slug: string;
    name: string;
  };
  routeBuilder?: (regionSlug: string) => RouteLocationRaw;
  readOnly?: boolean;
}>();

const emits = defineEmits(["mouseenter", "mouseleave", "click"]);

const route = computed(() => {
  if (!props.routeBuilder || !props.region) {
    return undefined;
  }
  return props.routeBuilder(props.region.slug);
});

const styleClass = computed(() => [
  "transition-all duration-75 fill-current",
  props.region ? "opacity-100" : "opacity-60",
  isHighlighted.value ? "text-primary" : "text-gray",
  props.region != null && !props.readOnly ? "cursor-pointer" : "",
]);

const isHovered = computed(
  () => props.region && props.region.id === props.hoveredRegion
);
const isSelected = computed(
  () => props.region && props.region.id === props.selectedRegion
);
const isHighlighted = computed(() => isHovered.value || isSelected.value);

const on = computed(() =>
  props.readOnly
    ? {}
    : {
        mouseenter: () =>
          emits("mouseenter", props.region ? props.region.id : null),
        mouseleave: () => emits("mouseleave"),
        click: () => emits("click", props.region ? props.region.id : null),
      }
);
</script>
<!-- RegionsMapItem.vue -->
<style scoped>
path {
  fill: currentColor;
  stroke: #fff;
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
  transition: all 0.2s ease;
}

path:hover,
path.highlighted {
  stroke-width: 2;
}
</style>
