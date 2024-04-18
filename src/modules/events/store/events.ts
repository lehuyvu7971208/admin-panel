// Utilities
import { defineStore } from 'pinia';
import { AxiosInstance } from 'axios';

// Models
import Event from '@/models/event';

// APIs
import { eventsApi, FindAllEventsParamsData } from '../api/events';

// Stores
import { useHttpStore } from '@/modules/http/store/http';

// Constants
import { DEFAULT_PAGINATION } from '@/libs/constant';

export type EventsState = {
  items: Array<Event>;

  pagination: Pagination;

  filter: FindAllEventsParamsData;
}

export type EventsGetters = {
  http(): AxiosInstance;
};

export type EventsActions = {
  setFilter(filter: FindAllEventsParamsData): Promise<void>;

  getEvents(): Promise<void>;
}

const DEFAULT_EVENTS_FILTER = {
  state: '',
  queueName: '',
  processName: '',
};

export const useEventsStore = defineStore<"events", EventsState, EventsGetters, EventsActions>(
  "events", {
    state: () => ({
      items: [],

      filter: {
        ...DEFAULT_EVENTS_FILTER,
        limit: 10,
        offset: 0,
      },

      pagination: {
        ...DEFAULT_PAGINATION,
      }
    }),

    getters: {
      http() {
        const httpStore = useHttpStore();
  
        return httpStore.instance;
      }
    },

    actions: {
      async setFilter(filter) {
        this.filter = {
          ...DEFAULT_EVENTS_FILTER,
          ...filter,
        };
      },

      async getEvents() {
        const response = await eventsApi(this.http).findAllEvents(this.filter);

        this.items = Event.build(response.data.events ?? []) as Array<Event>;

        this.pagination.total = response.data.pagination.total;
        this.pagination.limit = response.data.pagination.limit;
        this.pagination.offset = response.data.pagination.offset;
      }
    }
  }
);