// Utilities
import { defineStore } from "pinia";
import { AxiosInstance } from "axios";
import { ComputedRef, Ref, computed, ref } from "vue";

// Models
import User from "@/models/user";
import Business from "@/models/business";

// Apis
import { userApi } from "@/modules/users/api/users";

// Store
import { useHttpStore } from "@/modules/http/store/http";
import { useUserStore } from "@/modules/users/store/user";
import { businessesApi } from "@/modules/businesses/api/businesses";

export type BusinessActionStoreSetup = {
  /**@description User Store */
  user: ComputedRef<User>;

  saveUser(): Promise<User>;
  resetUser(): Promise<void>;
  updateUser(): Promise<User>;
  setUser(user: User): Promise<void>;
  deleteUser(id: number): Promise<void>;
  getUserById(id: number): Promise<void>;

  /**@description Business Store */
  business: Ref<Business>;

  searchKeyword: Ref<string>;
  searchedUsers: Ref<Array<any>>;

  http: ComputedRef<AxiosInstance>;

  reset(): Promise<void>;

  setBusinessUser(user: User): Promise<void>;
  setBusiness(business: Business): Promise<void>;

  getSearchUsers(): Promise<void>;
  getSearchedUser(id: number): Promise<User>;
  getBusinessById(id: number): Promise<void>;
  setSearchKeyword(keyword: string): Promise<void>;
  setSearchedUsers(users: Array<any>): Promise<void>;
};

export const useBusinessActionStore = defineStore<"businessAction", BusinessActionStoreSetup>("businessAction", () => {
  /**@description User Store */
  const userStore = useUserStore();
  const user = computed(() => userStore.target);

  /**@description Business Store */
  const searchKeyword = ref<string>("");
  const searchedUsers = ref<Array<any>>([]);

  const business = ref<Business>(new Business());

  const http = computed<AxiosInstance>(() => {
    return useHttpStore().instance;
  });

  const reset = async () => {
    searchKeyword.value = "";
    searchedUsers.value = [];

    business.value = new Business();
  };

  const setBusiness = async (data: Business) => {
    business.value.id = data.id;
    business.value.name = data.name;
    business.value.type = data.type;
    business.value.owner = data.owner;
    business.value.state = data.state;

    if (data.user) {
      setBusinessUser(data.user);
    }
  };

  const setBusinessUser = async (data: User) => {
    business.value.user.id = data.id;
    business.value.user.email = data.email;
    business.value.user.state = data.state;
    business.value.user.username = data.username;
    business.value.user.password = data.password;
    business.value.user.lastName = data.lastName;
    business.value.user.firstName = data.firstName;
    business.value.user.phoneNumber = data.phoneNumber;
    business.value.user.phoneRegion = data.phoneRegion;
    business.value.user.createdDate = data.createdDate;
    business.value.user.updatedDate = data.updatedDate;
    business.value.user.deletedDate = data.deletedDate;
  };

  const getSearchUsers = async () => {
    const response = await userApi(http.value).searchUsers({
      keyword: searchKeyword.value,
    });

    setSearchedUsers(response.data.users);
  };

  const setSearchedUsers = async (users: Array<any>) => {
    searchedUsers.value = users;
  };

  const getSearchedUser = async (id: number) => {
    const response = await userApi(http.value).findUser(id);

    return User.build(response.data.user) as User;
  };

  const setSearchKeyword = async (keyword: string) => {
    searchKeyword.value = keyword;
  };

  const getBusinessById = async (id: number) => {
    const response = await businessesApi(http.value).findBusiness(id);

    setBusiness(Business.build(response.data.business) as Business);
  };

  return {
    user,
    setUser: userStore.setUser,
    saveUser: userStore.saveUser,
    resetUser: userStore.resetUser,
    updateUser: userStore.updateUser,
    deleteUser: userStore.deleteUser,
    getUserById: userStore.getUserById,

    http,

    business,
    searchedUsers,
    searchKeyword,

    reset,
    setBusiness,
    getSearchUsers,
    setBusinessUser,
    getSearchedUser,
    getBusinessById,
    setSearchKeyword,
    setSearchedUsers,
  };
});
