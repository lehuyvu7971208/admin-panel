<template>
  <filtered :items="filteredItems" @remove="handleFilterRemove"></filtered>
</template>

<script lang="ts" setup>
// Utilities
import { computed } from "vue";

// Components
import Filtered from "frontend/Filtered.vue";

// Types
import { FindAllAdminsParamsData } from "@/modules/admins/api/admins";

// Constants
const FILTERED_TITLE_BY_KEY: Omit<Record<keyof FindAllAdminsParamsData, string>, "offset" | "limit"> = {
  type: "Role",
  state: "State",
  username: "Username",
  includeDeleted: "Include Deleted",
};

type AdminFilteredProps = {
  filters: FindAllAdminsParamsData;
};

const props = defineProps<AdminFilteredProps>();

type AdminFilteredEvents = {
  (event: "change", filters: FindAllAdminsParamsData): void;
};

const emit = defineEmits<AdminFilteredEvents>();

const filteredItems = computed(() => {
  return Object.entries(props.filters).reduce<Array<any>>((data, filter: any) => {
    const key = filter.at(0) as keyof FindAllAdminsParamsData;

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
  const key = filter.key as keyof FindAllAdminsParamsData;

  const filters = { ...props.filters };

  if (filters?.[key]) {
    delete filters[key];
  }

  emit("change", filters);
};
</script>
