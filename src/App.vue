<template>
  <v-app :class="appClassnames" :theme="customizer.actTheme">
    <http>
      <router-view />
    </http>

    <dialogs />

    <loading />

    <snackbars />
  </v-app>
</template>

<script lang="ts" setup>
// Utilities
import { computed } from "vue";

// Remote Utilities
import Dialog from "frontend/Modules/Dialog.js";
import LoadingIndicator from "frontend/Modules/Loading.js";

// Components
import Http from "@/modules/http/components/Http/Http.vue";
import Snackbars from "@/modules/snackbar/components/Snackbars/Snackbars.vue";

// Stores
import { useCustomizerStore } from "@/store/customizer";

const Dialogs = Dialog.Dialogs;
const Loading = LoadingIndicator.Loading;

const customizer = useCustomizerStore();

const appClassnames = computed(() => [
  customizer.actTheme,
  customizer.inputBg ? "inputWithbg" : "",
  customizer.borderCard ? "cardBordered" : "",
  customizer.miniSidebar ? "mini-sidebar" : "",
  customizer.horizontalLayout ? "horizontalLayout" : "verticalLayout",
]);
</script>
