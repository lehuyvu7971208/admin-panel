<template>
  <filtered :items="filteredItems" @remove="handleFilterRemove"></filtered>
</template>

<script lang="ts" setup>
// Utilities
import { computed } from "vue";

// Components
import Filtered from "frontend/Filtered.vue";

// Types
import { FindAllBusinessesParamsData } from "@/modules/businesses/api/businesses";

// Constants
const FILTERED_TITLE_BY_KEY: Omit<Record<keyof FindAllBusinessesParamsData, string>, "offset" | "limit"> = {
  type: "Role",
  name: "Name",
  state: "State",
  owner: "Owner",
  userId: "User ID",
  includeDeleted: "Include Deleted",
};

type BusinessFilteredProps = {
  filters: FindAllBusinessesParamsData;
};

const props = defineProps<BusinessFilteredProps>();

type BusinessFilteredEvents = {
  (event: "change", filters: FindAllBusinessesParamsData): void;
};

const emit = defineEmits<BusinessFilteredEvents>();

const filteredItems = computed(() => {
  return Object.entries(props.filters).reduce<Array<any>>((data, filter: any) => {
    const key = filter.at(0) as keyof FindAllBusinessesParamsData;

    if (key === "offset" || key === "limit") {
      return data;
    }

    if (filter.at(1)) {
      data.push({ key, value: filter.at(1), title: FILTERED_TITLE_BY_KEY?.[key] ?? "Unknown" });
    }

    return data;
  }, []);
});

const handleFilterRemove = (filter: any): void => {
  const key = filter.key as keyof FindAllBusinessesParamsData;

  const filters = { ...props.filters };

  if (filters?.[key]) {
    delete filters[key];
  }

  emit("change", filters);
};
</script>
