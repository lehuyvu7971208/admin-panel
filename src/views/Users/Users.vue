<template>
  <div class="user-management">
    <base-breadcrumb title="User Management" :breadcrumbs="breadcrumbs">
      <template #actions>
        <user-action ref="userActionRef" :value="user" @submit="handleUserActionSubmmit" @hide="handleUserActionHide" />
      </template>
    </base-breadcrumb>

    <v-row class="mb-3">
      <v-col>
        <user-filters :filters="filters" @submit="handleFilterChange">
          <template #filtered>
            <user-filtered :filters="filters" class="mt-6" @change="handleFilterChange" />
          </template>
        </user-filters>
      </v-col>
    </v-row>

    <v-row class="mb-3">
      <v-col>
        <user-table :users="users" @edit="handleUserEdit" @delete="handleUserDelete" />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <pagination :pagination="pagination" @page-change="handlePaginationChange" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
// Utilities
import { ref, computed } from "vue";
import { onSearch, useSearch } from "@/libs/utils/search";

// Remote Utilities
import Dialog from "frontend/Modules/Dialog.js";
import Loading from "frontend/Modules/Loading.js";

// Components
import UserTable from "./components/UserTable/UserTable.vue";
import UserFilters from "./components/UserFilters/UserFilters.vue";
import UserFiltered from "./components/UserFiltered/UserFiltered.vue";
import UserAction, { UserFormExpose } from "./components/UserAction/UserAction.vue";

// Remote Components
import Pagination from "frontend/Pagination.vue";
import BaseBreadcrumb from "frontend/BaseBreadcrumb.vue";

// Models
import User from "@/models/user";

// Apis
import { FindAllUsersParamsData } from "@/modules/users/api/users";

// Store
import { useUserManagementStore } from "./store/userManagement";

const dialog = Dialog.useDialog();
const loading = Loading.useLoading();

const userActionRef = ref<UserFormExpose>();
const userManagementStore = useUserManagementStore();

const breadcrumbs = computed(() => [
  {
    text: "Dashboard",
    disabled: false,
    href: "/",
  },
  {
    text: "User management",
    disabled: true,
    href: "#",
  },
]);

const user = computed(() => userManagementStore.user);
const users = computed(() => userManagementStore.users);
const filters = computed(() => userManagementStore.filters);
const pagination = computed(() => userManagementStore.pagination);

const { search, patch } = useSearch<FindAllUsersParamsData>(filters.value);

const loadUserByFilters = async (): Promise<void> => {
  try {
    loading(true);

    await userManagementStore.getUsers(filters.value);
  } catch (error: any) {
    dialog.error(error.message);
  } finally {
    loading(false);
  }
};

const handleFilterChange = (filters: FindAllUsersParamsData): void => {
  search(filters);
};

const handlePaginationChange = (pagination: Pagination): void => {
  patch({
    limit: pagination.limit,
    offset: pagination.offset,
  });
};

const handleUserActionHide = (): void => {
  userManagementStore.resetUser();
};

const handleUserEdit = async (id: number): Promise<void> => {
  await userManagementStore.getUserById(id);

  userActionRef.value?.show();
};

const handleUserDelete = async (id: number): Promise<void> => {
  dialog.confirm({
    title: "Warning",
    text: "Are you sure to want to delete this user?",

    onAgree: () => handleDeleteUserAgreed(id),
  });
};

const handleDeleteUserAgreed = async (id: number): Promise<void> => {
  await userManagementStore.deleteUser(id);

  loadUserByFilters();
};

const handleUserActionSubmmit = async (data: any) => {
  try {
    loading(true);

    const user = User.build(data) as User;
    await userManagementStore.setUser(user);

    if (!user.id) {
      await userManagementStore.saveUser();
    } else {
      await userManagementStore.updateUser();
    }

    userActionRef.value?.hide();

    loadUserByFilters();
  } catch (error: any) {
    dialog.error(error.message);
  } finally {
    loading(false);
  }
};

onSearch<FindAllUsersParamsData>(async (query) => {
  await userManagementStore.setFilters(query);

  loadUserByFilters();
});
</script>

<style lang="scss" scoped>
@import "./Users.scss";
</style>
