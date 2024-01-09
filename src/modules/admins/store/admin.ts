// Utilities
import { defineStore } from "pinia";
import { AxiosInstance } from "axios";

// Apis
import { adminApi } from "../api/admins";

// Models
import Admin from "../models/admin";

// Store
import { useHttpStore } from "@/modules/http/store/http";

type AdminState = {
  target: Admin;
};

type AdminGetters = {
  http(): AxiosInstance;
};

type AdminActions = {
  saveAdmin(): Promise<Admin>;
  resetAdmin(): Promise<void>;
  updateAdmin(): Promise<Admin>;
  setAdmin(admin: Admin): Promise<void>;
  deleteAdmin(id: number): Promise<void>;
  getAdminById(id: number): Promise<void>;
};

export const useAdminStore = defineStore<"admin", AdminState, AdminGetters, AdminActions>("admin", {
  state: () => ({
    target: new Admin(),
  }),

  getters: {
    http() {
      const httpStore = useHttpStore();
      return httpStore.instance;
    },
  },

  actions: {
    async setAdmin(admin) {
      this.target = admin;
    },

    async resetAdmin() {
      this.target = new Admin();
    },

    async saveAdmin() {
      const response = await adminApi(this.http).createAdmin({
        type: this.target.type,
        state: this.target.state,
        username: this.target.username,
        password: this.target.password,
      });

      const admin = Admin.build(response.data.admin) as Admin;
      this.setAdmin(admin);

      return admin;
    },

    async updateAdmin() {
      //
      const response = await adminApi(this.http).patchAdmin(this.target.id, {
        type: this.target.type,
        state: this.target.state,
      });

      const admin = Admin.build(response.data.admin) as Admin;
      this.setAdmin(admin);

      return admin;
    },

    async deleteAdmin(id) {
      await adminApi(this.http).deleteAdmin(id);
    },

    async getAdminById(id) {
      const response = await adminApi(this.http).findAdmin(id);

      const admin = Admin.build(response.data.admin) as Admin;
      this.setAdmin(admin);
    },
  },
});
