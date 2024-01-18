<template>
  <div class="business-management">
    <base-breadcrumb title="Business Management" :breadcrumbs="breadcrumbs">
      <template #actions>
        <business-action ref="businessActionRef" :business="business" @submit="handleBusinessActionSubmit" />
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
        <business-table :businesses="businesses" />
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

const handleBusinessActionSubmit = async (values: any): Promise<void> => {
  const business = Business.build(values) as Business;
  businessManagementStore.setBusiness(business);

  await businessManagementStore.saveBusiness();

  businessActionRef.value?.hide();

  loadBusinessesByFilters();
};

onSearch<FindAllBusinessesParamsData>(async (query) => {
  await businessManagementStore.setFilters(query);

  loadBusinessesByFilters();
});
</script>
