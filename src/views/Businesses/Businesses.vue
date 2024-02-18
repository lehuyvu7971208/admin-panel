<template>
  <div class="business-management">
    <base-breadcrumb title="Business Management" :breadcrumbs="breadcrumbs">
      <template #actions>
        <business-action ref="businessActionRef" :value="business" @submit="handleBusinessActionSubmit" @hide="handleBusinessActionHide" />
      </template>
    </base-breadcrumb>

    <v-row class="mb-3">
      <v-col>
        <business-filters :filters="filters" @submit="handleFilterChange">
          <template #filtered>
            <business-filtered :filters="filters" class="mt-6" @change="handleFilterChange" />
          </template>
        </business-filters>
      </v-col>
    </v-row>

    <v-row class="mb-3">
      <v-col>
        <business-table :businesses="businesses" @edit="handleBusinessEdit" @delete="handleBusinessDelete" />
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
import BusinessTable from "./components/BusinessTable/BusinessTable.vue";
import BusinessFilters from "./components/BusinessFilters/BusinessFilters.vue";
import BusinessFiltered from "./components/BusinessFiltered/BusinessFiltered.vue";
import BusinessAction, { BusinessActionExpose } from "./components/BusinessAction/BusinessAction.vue";

// Remote Components
import Pagination from "frontend/Pagination.vue";
import BaseBreadcrumb from "frontend/BaseBreadcrumb.vue";

// Models
import Business from "@/models/business";

// Apis
import { FindAllBusinessesParamsData } from "@/modules/businesses/api/businesses";

// Store
import { useBusinessManagementStore } from "./store/businessManagement";

const dialog = Dialog.useDialog();
const loading = Loading.useLoading();

const businessActionRef = ref<BusinessActionExpose>();
const businessManagementStore = useBusinessManagementStore();

const breadcrumbs = computed(() => [
  {
    text: "Dashboard",
    disabled: false,
    href: "/",
  },
  {
    text: "Business management",
    disabled: true,
    href: "#",
  },
]);

const filters = computed(() => businessManagementStore.filters);
const business = computed(() => businessManagementStore.business);
const businesses = computed(() => businessManagementStore.businesses);
const pagination = computed(() => businessManagementStore.pagination);

const { search, patch } = useSearch<FindAllBusinessesParamsData>(filters.value);

const loadBusinessesByFilters = async (): Promise<void> => {
  try {
    loading(true);

    await businessManagementStore.getBusinesses(filters.value);
  } catch (error: any) {
    dialog.error(error.message);
  } finally {
    loading(false);
  }
};

const handlePaginationChange = (pagination: Pagination): void => {
  patch({
    limit: pagination.limit,
    offset: pagination.offset,
  });
};

const handleFilterChange = (filters: FindAllBusinessesParamsData): void => {
  search(filters);
};

const handleBusinessEdit = async (id: number) => {
  await businessManagementStore.getBusinessById(id);

  businessActionRef.value?.show();
};

const handleBusinessActionHide = () => {
  businessManagementStore.resetBusiness();
};

const handleBusinessActionSubmit = async (values: any): Promise<void> => {
  try {
    loading(true);

    const business = Business.build(values) as Business;
    businessManagementStore.setBusiness(business);

    if (business.id) {
      await businessManagementStore.updateBusiness();
    } else {
      await businessManagementStore.saveBusiness();
    }

    businessActionRef.value?.hide();

    loadBusinessesByFilters();
  } catch (error: any) {
    dialog.error(error.message);
  } finally {
    loading(false);
  }
};

const handleBusinessDelete = async (id: number): Promise<void> => {
  dialog.confirm({
    title: "Warning",
    text: "Are you sure to want to delete this business?",

    onAgree: () => handleDeleteBusinessAgreed(id),
  });
};

const handleDeleteBusinessAgreed = async (id: number): Promise<void> => {
  try {
    loading(true);

    await businessManagementStore.deleteBusiness(id);

    loadBusinessesByFilters();
  } catch (error: any) {
    dialog.error(error.message);
  } finally {
    loading(false);
  }
};

onSearch<FindAllBusinessesParamsData>(async (query) => {
  await businessManagementStore.setFilters(query);

  loadBusinessesByFilters();
});
</script>
