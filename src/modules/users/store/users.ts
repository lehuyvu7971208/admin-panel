// Utilities
import { defineStore } from "pinia";
import { AxiosInstance } from "axios";

// Models
import User from "../../../models/user";

// Apis
import { userApi, FindAllUsersParamsData } from "../api/users";

// Store
import { useHttpStore } from "@/modules/http/store/http";

// Constants
import { DEFAULT_PAGINATION, DEFAULT_PAGINATION_LIMIT, DEFAULT_PAGINATION_OFFSET } from "@/libs/constant";

type UserManagementState = {
  items: Array<User>;

  pagination: Pagination;

  filters: FindAllUsersParamsData;
};

export type UserMangementGetters = {
  http(): AxiosInstance;
};

export type UserManagementActions = {
  getUsers(filters: FindAllUsersParamsData): Promise<void>;
  setFilters(filters: FindAllUsersParamsData): Promise<void>;
};

const DEFAULT_USERS_FILTERS = {
  email: "",
  username: "",
  lastName: "",
  firstName: "",
  phoneNumber: "",
  createdDate: "",
  includeDeleted: false,
};

export const useUsersStore = defineStore<"users", UserManagementState, UserMangementGetters, UserManagementActions>("users", {
  state: () => ({
    items: [],

    filters: {
      ...DEFAULT_USERS_FILTERS,
      limit: DEFAULT_PAGINATION_LIMIT,
      offset: DEFAULT_PAGINATION_OFFSET,
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
    async setFilters(filters: FindAllUsersParamsData) {
      this.filters = {
        ...DEFAULT_USERS_FILTERS,
        ...filters,
      };
    },

    async getUsers(filters: FindAllUsersParamsData) {
      const response = await userApi(this.http).findAllUsers(filters);

      this.items = User.build(response.data.users ?? []) as Array<User>;

      this.pagination.total = response.data.pagination.total;
      this.pagination.limit = response.data.pagination.limit;
      this.pagination.offset = response.data.pagination.offset;
    },
  },
});
