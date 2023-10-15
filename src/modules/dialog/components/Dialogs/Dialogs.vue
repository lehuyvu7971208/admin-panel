<template>
  <confirm-dialog v-for="dialog in dialogs" :key="dialog.id" v-bind="dialog" @hidden="handleDialogHidden(dialog.id)" />
</template>

<script lang="ts" setup>
// Utilities
import { computed } from "vue";

// Store
import { useDialogStore } from "../../store";

// Components
import ConfirmDialog from "../Dialog/Dialog.vue";

const dialogStore = useDialogStore();

const dialogs = computed(() => {
  return dialogStore.items;
});

const handleDialogHidden = (id: string): void => {
  dialogStore.removeDialog(id);
};
</script>
