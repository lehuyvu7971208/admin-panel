// Utilities
import { AxiosInstance, AxiosResponse } from "axios";

// Models
import { AdminState, AdminRole } from "../models/admin";

export type FindAllAdminsParamsData = {
  type?: string;
  state?: string;
  limit?: number;
  offset?: number;
  username?: string;
  includeDeleted?: boolean;
};

export type FindAllAdminsResponseData = ResponsePagination<{
  admins: Array<any>;
}>;

export type FindAdminResponseData = {
  admin: any;
};

export type CreateAdminRequestData = {
  username: string;
  password: string;

  type: AdminRole;
  state: AdminState;
};

export type CreateAdminResponseData = {
  admin: any;
};

export type PatchAdminRequestData = {
  type?: AdminRole;
  state?: AdminState;
};

export type PatchAdminResponseData = {
  admin: any;
};

export const adminApi = (http: AxiosInstance) => ({
  async findAdmin(id: number): Promise<AxiosResponse<FindAdminResponseData>> {
    return http.get(`/admins/${id}`);
  },

  async findAllAdmins(params: FindAllAdminsParamsData): Promise<AxiosResponse<FindAllAdminsResponseData>> {
    return http.get("/admins", {
      params,
    });
  },

  async createAdmin(data: CreateAdminRequestData): Promise<AxiosResponse<CreateAdminResponseData>> {
    return http.post("/admins", data);
  },

  async patchAdmin(id: number, data: PatchAdminRequestData): Promise<AxiosResponse<PatchAdminResponseData>> {
    return http.patch(`/admins/${id}`, data);
  },

  async deleteAdmin(id: number): Promise<AxiosResponse<any>> {
    return http.delete(`/admins/${id}`);
  },
});
