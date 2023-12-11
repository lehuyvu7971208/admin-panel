import { AxiosInstance, AxiosResponse } from "axios";

// Models


export enum UserState {
  Active = "active",
  UnActive = "unActive",
}

export type FindAllUsersParamsData = {
  limit?: number;
  offset?: number;

  email?: string;
  username?: string;
  lastName?: string;
  firstName?: string;
  phoneNumber?: string;
  createdDate?: string;
  includeDeleted?: boolean;
};

export type FindAllUsersResponseData<T> = ResponsePagination<{
  users: Array<T>;
}>;

export type FindUserResponseData = {
  user: any;
};

export type CreateUserRequestData = {
  email: string;
  state: UserState;
  username: string;
  password: string;
  lastName: string;
  firstName: string;
  phoneRegion: string;
  phoneNumber: string;
};

export type CreateUserResponseData = {
  user: any;
};

export type PatchUserRequestData = {
  state?: UserState;
  lastName?: string;
  firstName?: string;
  phoneRegion?: string;
  phoneNumber?: string;
};

export type PatchUserResponseData = {
  user: any;
};

export const userApi = (http: AxiosInstance) => ({
  async findUser(id: number | string): Promise<AxiosResponse<FindUserResponseData>> {
    return http.get(`/users/${id}`);
  },

  async findAllUsers(params?: FindAllUsersParamsData): Promise<AxiosResponse<FindAllUsersResponseData<any>>> {
    return http.get("/users", {
      params,
    });
  },

  async createUser(data: CreateUserRequestData): Promise<AxiosResponse<CreateUserResponseData>> {
    return http.post("/users", data);
  },

  async patchUser(id: number | string, data: PatchUserRequestData): Promise<AxiosResponse<PatchUserResponseData>> {
    return http.patch(`/users/${id}`, data);
  },

  async deleteUser(id: number | string): Promise<AxiosResponse<any>> {
    return http.delete(`/users/${id}`);
  },
});
