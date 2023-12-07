// Utilities
import { defineStore } from "pinia";
import { computed, ComputedRef } from "vue";

// Models
import User from "@/modules/users/models/user";

// Apis
import { FindAllUsersParamsData } from "@/modules/users/api/users";

// Stores
import { useUserStore } from "@/modules/users/store/user";
import { useUsersStore } from "@/modules/users/store/users";

type UserManagementSetup = {
  /**@description User Store */
  user: ComputedRef<User>;

  /**@description Users Store */
  users: ComputedRef<Array<User>>;
  pagination: ComputedRef<Pagination>;
  filters: ComputedRef<FindAllUsersParamsData>;

  getUsers(filters: FindAllUsersParamsData): Promise<void>;
  setFilters(filters: FindAllUsersParamsData): Promise<void>;
};

export const useUserManagementStore = defineStore<"userManagement", UserManagementSetup>("userManagement", () => {
  /**@description User Store */
  const userStore = useUserStore();
  const user = computed(() => userStore.target);

  /**@description Users Store */
  const usersStore = useUsersStore();

  const users = computed(() => usersStore.items);
  const filters = computed(() => usersStore.filters);
  const pagination = computed(() => usersStore.pagination);

  return {
    user,

    users,
    filters,
    pagination,

    getUsers: usersStore.getUsers,
    setFilters: usersStore.setFilters,
  };
});
