<template>
  <svg :width="svg.$.width" :height="svg.$.height" :viewBox="svg.$.viewBox">
    <RegionsMapItem
      v-for="(path, index) in paths"
      :key="index"
      :route-builder="routeBuilder"
      :d="path.d"
      :region="path.region"
      :hovered-region="hoveredRegion"
      :selected-region="modelValue"
      :read-only="readOnly"
      v-on="on"
    />
  </svg>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import regionsMap from "~/assets/xml/cataloniaRegions.xml";
import RegionsMapItem from "./RegionsMapItem.vue";
import type { RouteLocationRaw } from "vue-router";

const modelValue = defineModel<string>();

// Props
const props = defineProps<{
  regions: {
    id: string;
    slug: string;
    name: string;
  }[];
  routeBuilder?: (regionSlug: string) => RouteLocationRaw;
  readOnly?: boolean;
}>();

const hoveredRegion = ref<string | null>(null);
const svg = regionsMap.svg;

const paths = computed(() =>
  svg.g[0]!.path.map((path) => ({
    d: path.$.d,
    region: getRegionByMapId(path.$.id),
  }))
);

const on = computed(() =>
  props.readOnly
    ? {}
    : {
        click: (region: string) => (modelValue.value = region),
        mouseenter: (region: string) => setHoveredRegion(region),
        mouseleave: () => setHoveredRegion(null),
      }
);

// Methods
const getRegionByMapId = (slugId: string) => {
  return props.regions.find((region) => region.slug === slugId);
};

const setHoveredRegion = (region: string | null) => {
  hoveredRegion.value = region;
};

const emits = defineEmits<{
  hover: [string | null];
}>();

// Watchers
watch(hoveredRegion, () => {
  emits("hover", hoveredRegion.value);
});
</script>
