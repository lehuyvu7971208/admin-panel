<template>
  <div class="admin-management">
    <base-breadcrumb title="Admin Management" :breadcrumbs="breadcrumbs">
      <template #actions>
        <admin-action ref="adminActionRef" :value="admin" @submit="handleAdminActionSubmit" @hide="handleAdminActionHide" />
      </template>
    </base-breadcrumb>

    <v-row class="mb-3">
      <v-col>
        <admin-filters :filters="filters" @submit="handleFilterChange">
          <template #filtered>
            <admin-filtered :filters="filters" class="mt-6" @change="handleFilterChange" />
          </template>
        </admin-filters>
      </v-col>
    </v-row>

    <v-row class="mb-3">
      <v-col>
        <admin-table :admins="admins" @edit="handleAdminEdit" @delete="handleAdminDelete" />
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

// Models
import Admin from "@/models/admin";

// Apis
import { FindAllAdminsParamsData } from "@/modules/admins/api/admins";

// Store
import { useAdminManagementStore } from "./store/adminManagement";

// Components
import AdminTable from "./components/AdminTable/AdminTable.vue";
import AdminFilters from "./components/AdminFilters/AdminFilters.vue";
import AdminFiltered from "./components/AdminFiltered/AdminFiltered.vue";
import AdminAction, { AdminActionExpose } from "./components/AdminAction/AdminAction.vue";

// Remote Components
import Pagination from "frontend/Pagination.vue";
import BaseBreadcrumb from "frontend/BaseBreadcrumb.vue";

const dialog = Dialog.useDialog();
const loading = Loading.useLoading();

const adminActionRef = ref<AdminActionExpose>();
const adminManagementStore = useAdminManagementStore();

const breadcrumbs = computed(() => [
  {
    text: "Dashboard",
    disabled: false,
    href: "/",
  },
  {
    text: "Admin management",
    disabled: true,
    href: "#",
  },
]);

const admin = computed(() => adminManagementStore.admin);
const admins = computed(() => adminManagementStore.admins);
const filters = computed(() => adminManagementStore.filters);
const pagination = computed(() => adminManagementStore.pagination);

const { search, patch } = useSearch<FindAllAdminsParamsData>(filters.value);

const loadAdminsByFilters = async (): Promise<void> => {
  try {
    loading(true);

    await adminManagementStore.getAdmins(filters.value);
  } catch (error: any) {
    dialog.error(error.message);
  } finally {
    loading(false);
  }
};

const handleFilterChange = (filters: FindAllAdminsParamsData): void => {
  search(filters);
};

const handlePaginationChange = (pagination: Pagination): void => {
  patch({
    limit: pagination.limit,
    offset: pagination.offset,
  });
};

const handleAdminEdit = async (id: number) => {
  try {
    loading(true);

    await adminManagementStore.getAdminById(id);

    adminActionRef.value?.show();
  } catch (error: any) {
    dialog.error(error.message);
  } finally {
    loading(false);
  }
};

const handleAdminActionHide = () => {
  adminManagementStore.resetAdmin();
};

const handleAdminActionSubmit = async (value: any) => {
  try {
    loading(true);

    const admin = Admin.build(value) as Admin;
    await adminManagementStore.setAdmin(admin);

    if (!admin.id) {
      await adminManagementStore.saveAdmin();
    } else {
      await adminManagementStore.updateAdmin();
    }

    adminActionRef.value?.hide();

    loadAdminsByFilters();
  } catch (error: any) {
    dialog.error(error.message);
  } finally {
    loading(false);
  }
};

const handleAdminDelete = async (id: number) => {
  dialog.confirm({
    title: "Warning",
    text: "Are you sure to want to delete this user?",

    onAgree: () => handleDeleteAdminAgreed(id),
  });
};

const handleDeleteAdminAgreed = async (id: number) => {
  try {
    loading(true);

    await adminManagementStore.deleteAdmin(id);

    loadAdminsByFilters();
  } catch (error: any) {
    dialog.error(error.message);
  } finally {
    loading(false);
  }
};

onSearch<FindAllAdminsParamsData>(async (query) => {
  await adminManagementStore.setFilters(query);

  loadAdminsByFilters();
});
</script>
