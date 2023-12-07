<template>
  <v-app :class="appClassnames" :theme="customizer.actTheme">
    <http>
      <router-view />
    </http>

    <dialogs />

    <snackbars />
  </v-app>
</template>

<script lang="ts" setup>
// Utilities
import { computed } from "vue";

// Components
import Http from "@/modules/http/components/Http/Http.vue";
import Dialogs from "@/modules/dialog/components/Dialogs/Dialogs.vue";
import Snackbars from "@/modules/snackbar/components/Snackbars/Snackbars.vue";

// Stores
import { useCustomizerStore } from "@/store/customizer";

const customizer = useCustomizerStore();

const appClassnames = computed(() => [
  customizer.actTheme,
  customizer.inputBg ? "inputWithbg" : "",
  customizer.borderCard ? "cardBordered" : "",
  customizer.miniSidebar ? "mini-sidebar" : "",
  customizer.horizontalLayout ? "horizontalLayout" : "verticalLayout",
]);
</script>
