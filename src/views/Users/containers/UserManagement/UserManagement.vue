<template>
  <div class="user-management">
    <slot name="filters" v-bind="{ filters, changeFilters }"></slot>

    <slot name="table" v-bind="{ users }"></slot>

    <slot name="pagination" v-bind="{ pagination, changePagination }"></slot>
  </div>
</template>

<script lang="ts" setup>
// Utilities
import { computed } from "vue";
import { onSearch, useSearch } from "@/libs/utils/search";

// Store
import { useUserManagementStore } from "../../store/UserManagement";

// Types
import { FindAllUsersParamsData } from "@/modules/users/api/users";

const userManagementStore = useUserManagementStore();
const users = computed(() => userManagementStore.users);
const filters = computed(() => userManagementStore.filters);
const pagination = computed(() => userManagementStore.pagination);

const { search, patch } = useSearch<FindAllUsersParamsData>(filters.value);

const load = async (): Promise<void> => {
  try {
    await userManagementStore.getUsers(filters.value);
  } catch (error) {
    //
  }
};

const changePagination = async (pagination: Pagination) => {
  patch({
    limit: pagination.limit,
    offset: pagination.offset,
  });
};

const changeFilters = async (filters: FindAllUsersParamsData) => {
  search(filters);
};

onSearch<FindAllUsersParamsData>(async (query) => {
  await userManagementStore.setFilters(query);

  load();
});
</script>

<style lang="scss" scoped>
@import "./UserManagement.scss";
</style>
