<template>
  <div class="admin-management">
    <base-breadcrumb title="Admin Management" :breadcrumbs="breadcrumbs" />

    <v-row class="mb-3">
      <v-col>
        <admin-filters :filters="filters" @submit="handleFilterChange" />
      </v-col>
    </v-row>

    <v-row class="mb-3">
      <v-col>
        <admin-filtered :filters="filters" @change="handleFilterChange" />
      </v-col>

      <v-col sm="2" class="text-right">
        <admin-action ref="adminActionRef" :value="admin" @submit="handleAdminActionSubmit" @hide="handleAdminActionHide" />
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
import { useDialog } from "@/modules/dialog/utils";
import { onSearch, useSearch } from "@/libs/utils/search";

// Models
import Admin from "@/modules/admins/models/admin";

// Apis
import { FindAllAdminsParamsData } from "@/modules/admins/api/admins";

// Store
import { useAdminManagementStore } from "./store/adminManagement";

// Components
import AdminTable from "./components/AdminTable/AdminTable.vue";
import AdminFilters from "./components/AdminFilters/AdminFilters.vue";
import AdminFiltered from "./components/AdminFiltered/AdminFiltered.vue";
import AdminAction, { AdminActionExpose } from "./components/AdminAction/AdminAction.vue";

// Shared Components
import Pagination from "@/components/shared/Pagination/Pagination.vue";
import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb/BaseBreadcrumb.vue";

const dialog = useDialog();
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
    await adminManagementStore.getAdmins(filters.value);
  } catch (error) {
    //
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
  await adminManagementStore.getAdminById(id);

  adminActionRef.value?.show();
};

const handleAdminActionHide = () => {
  adminManagementStore.resetAdmin();
};

const handleAdminActionSubmit = async (value: any) => {
  const admin = Admin.build(value) as Admin;
  await adminManagementStore.setAdmin(admin);

  if (!admin.id) {
    await adminManagementStore.saveAdmin();
  } else {
    await adminManagementStore.updateAdmin();
  }

  adminActionRef.value?.hide();

  loadAdminsByFilters();
};

const handleAdminDelete = async (id: number) => {
  dialog.addDialogConfirm({
    title: "Warning",
    text: "Are you sure to want to delete this user?",

    onAgree: () => handleDeleteAdminAgreed(id),
  });
};

const handleDeleteAdminAgreed = async (id: number) => {
  await adminManagementStore.deleteAdmin(id);

  loadAdminsByFilters();
};

onSearch<FindAllAdminsParamsData>(async (query) => {
  await adminManagementStore.setFilters(query);

  loadAdminsByFilters();
});
</script>
