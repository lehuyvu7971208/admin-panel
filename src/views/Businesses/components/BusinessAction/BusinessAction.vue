<template>
  <v-dialog max-width="1000" persistent v-model="isDialogShown" class="align-start">
    <template #activator="{ props }">
      <v-btn color="primary" v-bind="props" flat> <v-icon class="mr-2">mdi-plus</v-icon>Add Business </v-btn>
    </template>

    <v-card>
      <v-card-title class="pa-4 bg-secondary">
        <span class="title text-white">{{ dialogTitle }}</span>
      </v-card-title>

      <template v-if="isBusinessEditing">
        <business-form-edit :business="business" @cancel="handleCancelClick" @submit="$emit('submit', $event)" />
      </template>
      <template v-else>
        <business-form-add @cancel="handleCancelClick" @submit="$emit('submit', $event)" />
      </template>
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
import BusinessFormAdd from "./components/BusinessFormAdd/BusinessFormAdd.vue";
import BusinessFormEdit from "./components/BusinessFormEdit/BusinessFormEdit.vue";

const isDialogShown = ref<boolean>();
const businessActionStore = useBusinessActionStore();

const dialogTitle = computed<string>(() => {
  return "Add Business";
});

export type BusinessActionProps = {
  value: Business;
};

const props = defineProps<BusinessActionProps>();

export type BusinessActionEvents = {
  (event: "hide"): void;
  (event: "show"): void;
  (event: "submit", values: any): void;
};

const emit = defineEmits<BusinessActionEvents>();

const business = computed<Business>(() => {
  return businessActionStore.business;
});

const isBusinessEditing = computed<boolean>(() => {
  return !!businessActionStore.business.id;
});

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
    emit("show");

    businessActionStore.setBusiness(props.value);
  } else {
    emit("hide");

    businessActionStore.reset();
  }
});
</script>

<style lang="scss" scoped></style>
