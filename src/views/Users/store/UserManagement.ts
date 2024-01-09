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

type UserManagementStoreSetup = {
  /**@description User Store */
  user: ComputedRef<User>;

  saveUser(): Promise<User>;
  resetUser(): Promise<void>;
  updateUser(): Promise<User>;
  setUser(user: User): Promise<void>;
  deleteUser(id: number): Promise<void>;
  getUserById(id: number): Promise<void>;

  /**@description Users Store */
  users: ComputedRef<Array<User>>;
  pagination: ComputedRef<Pagination>;
  filters: ComputedRef<FindAllUsersParamsData>;

  getUsers(filters: FindAllUsersParamsData): Promise<void>;
  setFilters(filters: FindAllUsersParamsData): Promise<void>;
};

export const useUserManagementStore = defineStore<"userManagement", UserManagementStoreSetup>("userManagement", () => {
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
    setUser: userStore.setUser,
    saveUser: userStore.saveUser,
    resetUser: userStore.resetUser,
    updateUser: userStore.updateUser,
    deleteUser: userStore.deleteUser,
    getUserById: userStore.getUserById,

    users,
    filters,
    pagination,
    getUsers: usersStore.getUsers,
    setFilters: usersStore.setFilters,
  };
});
