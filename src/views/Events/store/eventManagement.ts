// Utilities
import { computed, ComputedRef } from "vue";
import { defineStore } from "pinia";

// Models
import Event from "@/models/event";

// APIs
import { FindAllEventsParamsData } from "@/modules/events/api/events";

// Stores
import { useEventsStore } from "@/modules/events/store/events";

export type EventManagementStoreSetup = {
  events: ComputedRef<Array<Event>>;
  pagination: ComputedRef<Pagination>;
  filter: ComputedRef<FindAllEventsParamsData>;

  getEvents(): Promise<void>;
  setFilter(filter: FindAllEventsParamsData): Promise<void>;
};

export const useEventManagementStore = defineStore<"eventManagement", EventManagementStoreSetup>(
  'eventManagement',
  () => {
    const eventsStore = useEventsStore();

    const filter = computed(() => eventsStore.filter);
    const events = computed(() => eventsStore.items);
    const pagination = computed(() => eventsStore.pagination);

    return {
      filter,
      events,
      pagination,

      getEvents: eventsStore.getEvents,
      setFilter: eventsStore.setFilter,
    };
  },
);