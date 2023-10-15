<template>
  <v-snackbar v-model="isSnackbarShown" v-bind="$attrs" class="snackbar" multi-line>
    <div class="snackbar__text" v-html="text" />

    <template v-slot:actions>
      <v-btn color="red" variant="text" @click="handleCloseClick">Close</v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts" setup>
// Utilities
import { ref, watch } from "vue";

defineProps<{
  text: string;
}>();

const isSnackbarShown = ref<boolean>(true);

const emit = defineEmits<{
  (e: "hidden"): void;
}>();

watch(isSnackbarShown, (isSnackbarShown) => {
  if (!isSnackbarShown) emit("hidden");
});

const handleCloseClick = (): void => {
  isSnackbarShown.value = false;
};
</script>

<style lang="scss" scoped>
@import "./Snackbar.scss";
</style>
