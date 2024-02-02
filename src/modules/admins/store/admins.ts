// Utilities
import { defineStore } from "pinia";
import { AxiosInstance } from "axios";

// Models
import Admin from "../../../models/admin";

// Store
import { useHttpStore } from "@/modules/http/store/http";

// Apis
import { adminApi, FindAllAdminsParamsData } from "../api/admins";

// Constants
import { DEFAULT_PAGINATION } from "@/libs/constant";

export type AdminsState = {
  items: Array<Admin>;

  pagination: Pagination;

  filters: FindAllAdminsParamsData;
};

export type AdminsGetters = {
  http(): AxiosInstance;
};

export type AdminsActions = {
  getAdmins(filters: FindAllAdminsParamsData): Promise<void>;
  setFilters(filters: FindAllAdminsParamsData): Promise<void>;
};

const DEFAULT_ADMINS_FILTERS = {
  type: "",
  state: "",
  username: "",
  includeDeleted: false,
};

export const useAdminsStore = defineStore<"admins", AdminsState, AdminsGetters, AdminsActions>("admins", {
  state: () => ({
    items: [],

    filters: {
      ...DEFAULT_ADMINS_FILTERS,
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
        ...DEFAULT_ADMINS_FILTERS,
        ...filters,
      };
    },

    async getAdmins(filters) {
      const response = await adminApi(this.http).findAllAdmins(filters);

      this.items = Admin.build(response.data.admins ?? []) as Array<Admin>;

      this.pagination.total = response.data.pagination.total;
      this.pagination.limit = response.data.pagination.limit;
      this.pagination.offset = response.data.pagination.offset;
    },
  },
});
