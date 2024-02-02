// Utilities
import { defineStore } from "pinia";
import { AxiosInstance } from "axios";

// Models
import Business from "@/models/business";

// Store
import { useHttpStore } from "@/modules/http/store/http";

// Apis
import { businessesApi, FindAllBusinessesParamsData } from "../api/businesses";

// Constants
import { DEFAULT_PAGINATION } from "@/libs/constant";

export type BusinessesState = {
  items: Array<Business>;

  pagination: Pagination;

  filters: FindAllBusinessesParamsData;
};

export type BusinessesGetters = {
  http(): AxiosInstance;
};

export type BusinessesActions = {
  setFilters(filters: FindAllBusinessesParamsData): Promise<void>;
  getBusinesses(filters: FindAllBusinessesParamsData): Promise<void>;
};

const DEFAULT_BUSINESSES_FILTERS = {
  name: "",
  owner: "",
  userId: "",
  includeDeleted: false,
};

export const useBusinessesStore = defineStore<"businesses", BusinessesState, BusinessesGetters, BusinessesActions>("businesses", {
  state: () => ({
    items: [],

    filters: {
      ...DEFAULT_BUSINESSES_FILTERS,
      limit: 10,
      offset: 0,
    },

    pagination: {
      ...DEFAULT_PAGINATION,
    },
  }),

  getters: {
    http() {
      const httpStore = useHttpStore();
      return httpStore.instance;
    },
  },

  actions: {
    async setFilters(filters) {
      this.filters = {
        ...DEFAULT_BUSINESSES_FILTERS,
        ...filters,
      };
    },

    async getBusinesses(filters) {
      const response = await businessesApi(this.http).findAllBusinesses(filters);

      this.items = Business.build(response.data.businesses ?? []) as Array<Business>;

      this.pagination.total = response.data.pagination.total;
      this.pagination.limit = response.data.pagination.limit;
      this.pagination.offset = response.data.pagination.offset;
    },
  },
});
