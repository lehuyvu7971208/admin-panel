<template>
  <filtered :items="filteredItems" @remove="handleFilterRemove"></filtered>
</template>

<script lang="ts" setup>
// Utilities
import { computed } from "vue";

// Components
import Filtered from "frontend/Filtered.vue";

// Types
import { FindAllUsersParamsData } from "@/modules/users/api/users";

// Constants
const FILTERED_TITLE_BY_KEY: Omit<Record<keyof FindAllUsersParamsData, string>, "offset" | "limit"> = {
  email: "Email",
  username: "Username",
  lastName: "Last Name",
  firstName: "First Name",
  phoneNumber: "Phone Number",
  createdDate: "Created Date",
  includeDeleted: "Include Deleted",
};

type UserFilteredProps = {
  filters: FindAllUsersParamsData;
};

type UserFilteredEvents = {
  (event: "change", filters: FindAllUsersParamsData): void;
};

const emit = defineEmits<UserFilteredEvents>();

const props = defineProps<UserFilteredProps>();

const filteredItems = computed(() => {
  return Object.entries(props.filters).reduce<Array<any>>((data, filter: any) => {
    const key = filter.at(0) as keyof FindAllUsersParamsData;

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
  const key = filter.key as keyof FindAllUsersParamsData;

  const filters = { ...props.filters };

  if (filters?.[key]) {
    delete filters[key];
  }

  emit("change", filters);
};
</script>
