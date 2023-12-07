<template>
  <v-pagination color="primary" rounded="circle" :length="length" :model-value="page" @update:model-value="handleModelValueChange" />
</template>

<script lang="ts" setup>
// Utilities
import { computed } from "vue";

export type PaginationProps = {
  pagination: Pagination;
};

export type PageChangeEventData = {
  limit: number;
  offset: number;
};

export type PaginationEvents = {
  (event: "page-change", data: PageChangeEventData): void;
};

const props = defineProps<PaginationProps>();

const emit = defineEmits<PaginationEvents>();

const page = computed(() => {
  const offset = props.pagination?.offset ?? 0;
  const limit = props.pagination?.limit || 10;

  return offset / limit + 1;
});

const length = computed(() => {
  const total = props.pagination?.total || 0;
  const limit = props.pagination?.limit || 10;

  return Math.ceil(total / limit) ?? 1;
});

const handleModelValueChange = (value: number) => {
  const limit = props.pagination?.limit || 10;

  emit("page-change", {
    limit,
    offset: (value - 1) * limit,
  });
};
</script>
