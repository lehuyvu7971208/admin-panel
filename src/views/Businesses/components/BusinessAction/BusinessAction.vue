<template>
  <v-dialog max-width="1000" persistent v-model="isDialogShown" class="align-start">
    <template #activator="{ props }">
      <v-btn color="primary" v-bind="props" flat> <v-icon class="mr-2">mdi-plus</v-icon>Add Business </v-btn>
    </template>

    <v-card>
      <v-card-title class="pa-4 bg-secondary">
        <span class="title text-white">{{ dialogTitle }}</span>
      </v-card-title>

      <business-form @cancel="handleCancelClick" @submit="$emit('submit', $event)" />
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
// Utilities
import { ref, watch, computed } from "vue";

// Models
import Business from "@/models/business";

// Store
import { useBusinessActionStore } from "./store/businessAction";

// Components
import BusinessForm from "./components/BusinessForm/BusinessForm.vue";

const isDialogShown = ref<boolean>();
const businessActionStore = useBusinessActionStore();

const dialogTitle = computed<string>(() => {
  return "Add Business";
});

export type BusinessActionProps = {
  business: Business;
};

const props = defineProps<BusinessActionProps>();

export type BusinessActionEvents = {
  (event: "submit", values: any): void;
};

defineEmits<BusinessActionEvents>();

const handleCancelClick = () => {
  isDialogShown.value = false;
};

export type BusinessActionExpose = {
  hide(): void;
  show(): void;
};

defineExpose<BusinessActionExpose>({
  show: () => (isDialogShown.value = true),
  hide: () => (isDialogShown.value = false),
});

watch(isDialogShown, (isDialogShown) => {
  if (isDialogShown) {
    businessActionStore.setBusiness(props.business);
  } else {
    businessActionStore.setSearchedUsers([]);
    businessActionStore.setSearchKeyword("");
    businessActionStore.setBusiness(new Business());
  }
});
</script>

<style lang="scss" scoped></style>
