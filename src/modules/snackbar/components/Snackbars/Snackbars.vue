<template>
  <div class="snackbars">
    <snackbar v-for="snackbar in snackbars" :key="snackbar.id" v-bind="snackbar" @hidden="handleSnackbarHidden(snackbar.id)" />
  </div>
</template>

<script lang="ts" setup>
// Utilities
import { computed } from "vue";

// Store
import { useSnackbarStore } from "../../store";

// Components
import Snackbar from "../Snackbar/Snackbar.vue";

const snackbarStore = useSnackbarStore();

const snackbars = computed<Array<any>>(() => {
  return snackbarStore.items;
});

const handleSnackbarHidden = (id: number) => {
  snackbarStore.removeSnackbar(id);
};
</script>

<style lang="scss" scoped>
@import "./Snackbars.scss";
</style>
