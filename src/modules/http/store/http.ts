// Utilities
import { defineStore } from "pinia";
import queryString from "query-string";
import axios, { AxiosInstance } from "axios";

// Store
import { useAuthStore } from "@/modules/auth/store/auth";

type HttpState = {};

type HttpGetters = {
  instance(state?: HttpState): AxiosInstance;
};

type HttpActions = {};

export const useHttpStore = defineStore<"http", HttpState, HttpGetters, HttpActions>("http", {
  state: () => ({}),

  getters: {
    instance() {
      const http = axios.create({
        baseURL: import.meta.env.PUBLIC_API_URL,
        paramsSerializer: function (params) {
          return queryString.stringify(params, {
            skipNull: true,
            skipEmptyString: true,
          });
        },
      });

      http.interceptors.request.use((config) => {
        const authStore = useAuthStore();
        config.headers.setContentType("application/json");

        if (authStore.accessToken) {
          config.headers.setAuthorization(`Bearer ${authStore.accessToken}`);
        }

        return config;
      });

      return http;
    },
  },
});
