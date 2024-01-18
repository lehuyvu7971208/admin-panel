// Utilities
import { defineStore } from "pinia";
import { AxiosInstance } from "axios";

// Models
import User from "@/models/user";
import Business from "@/models/business";

// Apis
import { userApi } from "@/modules/users/api/users";

// Store
import { useHttpStore } from "@/modules/http/store/http";

export type BusinessActionState = {
  business: Business;

  searchKeyword: string;
  searchedUsers: Array<any>;
};

export type BusinessActionGetters = {
  http(): AxiosInstance;
};

export type BusinessActionActions = {
  setUser(user: User): Promise<void>;
  setBusiness(business: Business): Promise<void>;

  getSearchUsers(): Promise<void>;
  getSearchedUser(id: number): Promise<User>;
  setSearchKeyword(keyword: string): Promise<void>;
  setSearchedUsers(users: Array<any>): Promise<void>;
};

export const useBusinessActionStore = defineStore<"businessAction", BusinessActionState, BusinessActionGetters, BusinessActionActions>(
  "businessAction",
  {
    state: () => ({
      searchKeyword: "",
      searchedUsers: [],

      business: new Business(),
    }),

    getters: {
      http() {
        return useHttpStore().instance;
      },
    },

    actions: {
      async setBusiness(business) {
        this.business.id = business.id;
        this.business.name = business.name;
        this.business.type = business.type;
        this.business.owner = business.owner;
        this.business.state = business.state;

        if (business.user) {
          this.setUser(business.user);
        }
      },

      async setUser(user) {
        this.business.user.id = user.id;
        this.business.user.email = user.email;
        this.business.user.state = user.state;
        this.business.user.username = user.username;
        this.business.user.password = user.password;
        this.business.user.lastName = user.lastName;
        this.business.user.firstName = user.firstName;
        this.business.user.phoneNumber = user.phoneNumber;
        this.business.user.phoneRegion = user.phoneRegion;
        this.business.user.createdDate = user.createdDate;
        this.business.user.updatedDate = user.updatedDate;
        this.business.user.deletedDate = user.deletedDate;
      },

      async getSearchUsers() {
        const response = await userApi(this.http).searchUsers({
          keyword: this.searchKeyword,
        });

        this.setSearchedUsers(response.data.users);
      },

      async setSearchedUsers(users: Array<any>) {
        this.searchedUsers = users;
      },

      async getSearchedUser(id: number) {
        const response = await userApi(this.http).findUser(id);

        return User.build(response.data.user) as User;
      },

      async setSearchKeyword(keyword: string) {
        this.searchKeyword = keyword;
      },
    },
  }
);
