// Utilities
import { defineStore } from "pinia";
import { computed, ComputedRef } from "vue";

// Models
import Admin from "@/models/admin";

// Apis
import { FindAllAdminsParamsData } from "@/modules/admins/api/admins";

// Store
import { useAdminStore } from "@/modules/admins/store/admin";
import { useAdminsStore } from "@/modules/admins/store/admins";

type AdminManagementStoreSetup = {
  /**@description Admin Store */
  admin: ComputedRef<Admin>;

  saveAdmin(): Promise<Admin>;
  resetAdmin(): Promise<void>;
  updateAdmin(): Promise<Admin>;
  setAdmin(admin: Admin): Promise<void>;
  deleteAdmin(id: number): Promise<void>;
  getAdminById(id: number): Promise<void>;

  /**@description Admins Store */
  admins: ComputedRef<Array<Admin>>;
  pagination: ComputedRef<Pagination>;
  filters: ComputedRef<FindAllAdminsParamsData>;

  getAdmins(filters: FindAllAdminsParamsData): Promise<void>;
  setFilters(filters: FindAllAdminsParamsData): Promise<void>;
};

export const useAdminManagementStore = defineStore<"adminManagement", AdminManagementStoreSetup>("adminManagement", () => {
  /**@description Admin Store */
  const adminStore = useAdminStore();
  const admin = computed(() => adminStore.target);

  /**@description Admins Store */
  const adminsStore = useAdminsStore();

  const admins = computed(() => adminsStore.items);
  const filters = computed(() => adminsStore.filters);
  const pagination = computed(() => adminsStore.pagination);

  return {
    admin,
    setAdmin: adminStore.setAdmin,
    saveAdmin: adminStore.saveAdmin,
    resetAdmin: adminStore.resetAdmin,
    updateAdmin: adminStore.updateAdmin,
    deleteAdmin: adminStore.deleteAdmin,
    getAdminById: adminStore.getAdminById,

    admins,
    filters,
    pagination,
    getAdmins: adminsStore.getAdmins,
    setFilters: adminsStore.setFilters,
  };
});
