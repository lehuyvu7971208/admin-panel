// Utilities
import { defineStore } from "pinia";
import { AxiosInstance } from "axios";

// Apis
import { userApi } from "../api/users";

// Models
import User from "../models/user";

// Store
import { useHttpStore } from "@/modules/http/store/http";

export type UserState = {
  target: User;
};

export type UserGetters = {
  http(): AxiosInstance;
};

export type UserActions = {
  saveUser(): Promise<User>;
  resetUser(): Promise<void>;
  updateUser(): Promise<User>;
  setUser(user: User): Promise<void>;
  deleteUser(id: number): Promise<void>;
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
    async setUser(user) {
      this.target = user;
    },

    async resetUser() {
      this.target = new User();
    },

    async saveUser() {
      const response = await userApi(this.http).createUser({
        email: this.target.email,
        state: this.target.state,
        username: this.target.username,
        password: this.target.password,
        lastName: this.target.lastName,
        firstName: this.target.firstName,
        phoneRegion: this.target.phoneRegion,
        phoneNumber: this.target.phoneNumber,
      });

      const user = User.build(response.data.user) as User;
      this.setUser(user);

      return user;
    },

    async updateUser() {
      const response = await userApi(this.http).patchUser(this.target.id, {
        state: this.target?.state,
        lastName: this.target?.lastName,
        firstName: this.target?.firstName,
        phoneRegion: this.target?.phoneRegion,
        phoneNumber: this.target?.phoneNumber,
      });

      const user = User.build(response.data.user) as User;
      this.setUser(user);

      return user;
    },

    async deleteUser(id: number) {
      await userApi(this.http).deleteUser(id);
    },

    async getUserById(id) {
      const response = await userApi(this.http).findUser(id);
      this.setUser(User.build(response.data.user) as User);
    },
  },
});
