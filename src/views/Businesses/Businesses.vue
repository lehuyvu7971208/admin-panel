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
import { useDialog } from "@/modules/dialog/utils";
import { onSearch, useSearch } from "@/libs/utils/search";

// Components
import BusinessTable from "./components/BusinessTable/BusinessTable.vue";
import BusinessFilters from "./components/BusinessFilters/BusinessFilters.vue";
import BusinessFiltered from "./components/BusinessFiltered/BusinessFiltered.vue";
import BusinessAction, { BusinessActionExpose } from "./components/BusinessAction/BusinessAction.vue";

// Shared Components
import Pagination from "@/components/shared/Pagination/Pagination.vue";
import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb/BaseBreadcrumb.vue";

// Models
import Business from "@/models/business";

// Apis
import { FindAllBusinessesParamsData } from "@/modules/businesses/api/businesses";

// Store
import { useBusinessManagementStore } from "./store/businessManagement";

const dialog = useDialog();
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
    await businessManagementStore.getBusinesses(filters.value);
  } catch (error) {
    //
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
  const business = Business.build(values) as Business;
  businessManagementStore.setBusiness(business);

  if (business.id) {
    await businessManagementStore.updateBusiness();
  } else {
    await businessManagementStore.saveBusiness();
  }

  businessActionRef.value?.hide();

  loadBusinessesByFilters();
};

const handleBusinessDelete = async (id: number): Promise<void> => {
  dialog.addDialogConfirm({
    title: "Warning",
    text: "Are you sure to want to delete this business?",

    onAgree: () => handleDeleteBusinessAgreed(id),
  });
};

const handleDeleteBusinessAgreed = async (id: number): Promise<void> => {
  await businessManagementStore.deleteBusiness(id);

  loadBusinessesByFilters();
};

onSearch<FindAllBusinessesParamsData>(async (query) => {
  await businessManagementStore.setFilters(query);

  loadBusinessesByFilters();
});
</script>
