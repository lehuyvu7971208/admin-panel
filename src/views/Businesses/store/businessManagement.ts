// Utilities
import { defineStore } from "pinia";
import { computed, ComputedRef } from "vue";

// Models
import Business from "@/models/business";

// Apis
import { FindAllBusinessesParamsData } from "@/modules/businesses/api/businesses";

// Store
import { useBusinessStore } from "@/modules/businesses/store/business";
import { useBusinessesStore } from "@/modules/businesses/store/businesses";

export type BusinessManagementStoreSetup = {
  /**@description Business Store */
  business: ComputedRef<Business>;

  resetBusiness(): Promise<void>;
  saveBusiness(): Promise<Business>;
  updateBusiness(): Promise<Business>;
  deleteBusiness(id: number): Promise<void>;
  getBusinessById(id: number): Promise<void>;
  setBusiness(business: Business): Promise<void>;

  /**@description Businesses Store */
  pagination: ComputedRef<Pagination>;
  businesses: ComputedRef<Array<Business>>;
  filters: ComputedRef<FindAllBusinessesParamsData>;

  setFilters(filters: FindAllBusinessesParamsData): Promise<void>;
  getBusinesses(filters: FindAllBusinessesParamsData): Promise<void>;
};

export const useBusinessManagementStore = defineStore<"businessManagement", BusinessManagementStoreSetup>("businessManagement", () => {
  /**@description Business Store */
  const businessStore = useBusinessStore();

  const business = computed(() => businessStore.target);

  /**@description Businesses Store */
  const businessesStore = useBusinessesStore();

  const filters = computed(() => businessesStore.filters);
  const businesses = computed(() => businessesStore.items);
  const pagination = computed(() => businessesStore.pagination);

  return {
    business,
    setBusiness: businessStore.setBusiness,
    saveBusiness: businessStore.saveBusiness,
    resetBusiness: businessStore.resetBusiness,
    updateBusiness: businessStore.updateBusiness,
    deleteBusiness: businessStore.deleteBusiness,
    getBusinessById: businessStore.getBusinessById,

    filters,
    businesses,
    pagination,

    setFilters: businessesStore.setFilters,
    getBusinesses: businessesStore.getBusinesses,
  };
});
