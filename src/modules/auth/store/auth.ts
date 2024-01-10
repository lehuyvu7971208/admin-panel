// Utilities
import { defineStore } from "pinia";
import { AxiosInstance } from "axios";

// Store
import { useHttpStore } from "@/modules/http/store/http";

// Apis
import { authApi, SignInRequestData } from "../api/auth";

// Models
import Admin from "@/modules/admins/models/admin";

type AuthState = {
  admin?: Admin | null;
  accessToken: string | null;
};

type AuthGetters = {
  http(state?: AuthState): AxiosInstance;
};

type AuthActions = {
  me(): Promise<void>;
  signOut(): Promise<void>;
  signIn(data: SignInRequestData): Promise<void>;
};

export const useAuthStore = defineStore<"auth", AuthState, AuthGetters, AuthActions>("auth", {
  state: () => ({
    admin: null,
    accessToken: localStorage.getItem("accessToken"),
  }),

  getters: {
    http() {
      const httpStore = useHttpStore();
      return httpStore.instance;
    },
  },

  actions: {
    async me() {
      const response = await authApi(this.http).me();
      
      this.admin = Admin.build(response.data.admin) as Admin;
    },

    async signIn(data) {
      const response = await authApi(this.http).signIn(data);

      this.accessToken = response.data.accessToken;
      localStorage.setItem("accessToken", response.data.accessToken);
    },

    async signOut() {
      this.accessToken = null;
      localStorage.removeItem("accessToken");
    },
  },
});
