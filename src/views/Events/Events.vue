<template>
  <div class="event-management">
    <base-breadcrumb title="Event Management" :breadcrumbs="breadcrumbs" />
  </div>

  <v-row class="mb-3">
    <v-col>
      <event-filters />
    </v-col>
  </v-row>

  <v-row class="mb-3">
    <v-col>
      <event-table :events="events" />
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <pagination :pagination="pagination" @page-change="handlePageChange" />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
  // Utilities
  import { computed } from 'vue';
  import { onSearch, useSearch} from "@/libs/utils/search";

  // Remote Utilities
  import Dialog from "frontend/Modules/Dialog.js";
  import Loading from "frontend/Modules/Loading.js";

  // Remote Components
  import Pagination from "frontend/Pagination.vue";
  import BaseBreadcrumb from "frontend/BaseBreadcrumb.vue";

  // Components
  import EventTable from './components/EventTable/EventTable.vue';
  import EventFilters from './components/EventFilters/EventFilters.vue';
  
  // APIs
  import { FindAllEventsParamsData } from '@/modules/events/api/events';

  // Stores
  import { useEventManagementStore } from './store/eventManagement';

  const dialog = Dialog.useDialog();
  const loading = Loading.useLoading();
  const { patch } = useSearch();

  const eventManagementStore = useEventManagementStore();

  const breadcrumbs = computed(() => [
    {
      text: "Dashboard",
      disabled: false,
      href: "/",
    },
    {
      text: "Event management",
      disabled: true,
      href: "#",
    },
  ]);

  const events = computed(() => eventManagementStore.events);
  const filters = computed(() => eventManagementStore.filter);
  const pagination = computed(() => eventManagementStore.pagination);

  const loadEventsByFilter = async (): Promise<void> => {
    try {
      loading(true);

      await eventManagementStore.getEvents();
    } catch (error: any) {
      dialog.error(error.message);
    } finally {
      loading(false);
    }
  };

  const handlePageChange = (pagination: Pagination): void => {
    patch({
      limit: pagination.limit,
      offset: pagination.offset,
    });
  };

  onSearch<FindAllEventsParamsData>(async (query) => {
    await eventManagementStore.setFilter(query);

    await loadEventsByFilter();
  });
</script>

<style lang="scss" scoped>
  @import './Events.scss';
</style>