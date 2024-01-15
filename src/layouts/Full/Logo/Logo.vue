<script lang="ts" setup>
import { computed } from "vue";

import LogoDark from "./LogoDark.vue";
import LogoLight from "./LogoLight.vue";

import { useCustomizerStore } from "@/store/customizer";

const customizer = useCustomizerStore();

//const dark = ref(false);
const dark = computed(() => {
  if (
    customizer.actTheme === "DARK_BLUE_THEME" ||
    customizer.actTheme === "DARK_RED_THEME" ||
    customizer.actTheme === "DARK_ORANGE_THEME" ||
    customizer.actTheme === "DARK_PURPLE_THEME" ||
    customizer.actTheme === "DARK_GREEN_THEME" ||
    customizer.actTheme === "DARK_INDIGO_THEME"
  ) {
    return true;
  } else {
    return false;
  }
});
</script>
<template>
  <LogoLight v-if="dark" />
  <LogoDark v-else />
</template>
