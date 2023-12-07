// Utilities
import { defineStore } from "pinia";
import { AxiosInstance } from "axios";

// Apis
import { userApi } from "../api/users";

// Models
import User from "../models/user";
import { useHttpStore } from "@/modules/http/store/http";

export type UserState = {
  target: User;
};

export type UserGetters = {
  http(): AxiosInstance;
};

export type UserActions = {
  setUser(user: User): void;
  getUserById(id: number | string): Promise<void>;
};

export const useUserStore = defineStore<"user", UserState, UserGetters, UserActions>("user", {
  state: () => ({
    target: new User(),
  }),

  getters: {
    http() {
      return useHttpStore().instance;
    },
  },

  actions: {
    setUser(user) {
      this.target = user;
    },

    async getUserById(id) {
      const response = await userApi(this.http).findUser(id);
      this.setUser(User.build(response.data.user) as User);
    },
  },
});