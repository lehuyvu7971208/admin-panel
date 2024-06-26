// Utilities
import { defineStore } from "pinia";
import { AxiosInstance } from "axios";

// Apis
import { businessesApi } from "../api/businesses";

// Models
import Business from "@/models/business";

// Store
import { useHttpStore } from "@/modules/http/store/http";

export type BusinessState = {
  target: Business;
};

export type BusinessGetters = {
  http(): AxiosInstance;
};

export type BusinessActions = {
  resetBusiness(): Promise<void>;
  saveBusiness(): Promise<Business>;
  updateBusiness(): Promise<Business>;
  deleteBusiness(id: number): Promise<void>;
  getBusinessById(id: number): Promise<void>;
  setBusiness(business: Business): Promise<void>;
};

export const useBusinessStore = defineStore<"business", BusinessState, BusinessGetters, BusinessActions>("business", {
  state: () => ({
    target: new Business(),
  }),

  getters: {
    http() {
      return useHttpStore().instance;
    },
  },

  actions: {
    async setBusiness(business) {
      this.target = business;
    },

    async resetBusiness() {
      this.target = new Business();
    },

    async saveBusiness() {
      const response = await businessesApi(this.http).createBusiness({
        name: this.target.name,
        type: this.target.type,
        state: this.target.state,
        owner: this.target.owner,

        user: {
          id: this.target.user.id,
          email: this.target.user.email,
          state: this.target.user.state,
          username: this.target.user.username,
          password: this.target.user.password,
          lastName: this.target.user.lastName,
          firstName: this.target.user.firstName,
          phoneRegion: this.target.user.phoneRegion,
          phoneNumber: this.target.user.phoneNumber,
        },
      });

      const business = Business.build(response.data.business) as Business;
      this.setBusiness(business);

      return business;
    },

    async getBusinessById(id) {
      const response = await businessesApi(this.http).findBusiness(id);
      this.setBusiness(Business.build(response.data.business) as Business);
    },

    async updateBusiness() {
      const response = await businessesApi(this.http).updateBusiness(this.target.id, {
        name: this.target.name,
        type: this.target.type,
        owner: this.target.owner,
        state: this.target.state,
      });

      const business = Business.build(response.data.business) as Business;
      this.setBusiness(business);

      return business;
    },

    async deleteBusiness(id: number) {
      await businessesApi(this.http).deleteBusiness(id);
    },
  },
});
