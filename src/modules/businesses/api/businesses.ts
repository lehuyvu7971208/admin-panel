// Utilities
import { AxiosInstance, AxiosResponse } from "axios";

export type FindAllBusinessesParamsData = {
  name?: string;
  owner?: string;
  userId?: string;

  type?: string;
  state?: string;

  limit: number;
  offset: number;
  includeDeleted?: boolean;
};

export type FindAllBusinessesResponseData = ResponsePagination<{
  businesses: Array<any>;
}>;

export type FindBusinessResponseData = {
  business: any;
};

export type CreateBusinessRequestData = {
  user: any;
  name: string;
  type: string;
  owner: string;
  state: string;
};

export type CreateBusinessResponseData = {
  business: any;
};

export const businessesApi = (http: AxiosInstance) => ({
  async findBusiness(id: number): Promise<AxiosResponse<FindBusinessResponseData>> {
    return http.get(`/businesses/${id}`);
  },

  async findAllBusinesses(params: FindAllBusinessesParamsData): Promise<AxiosResponse<FindAllBusinessesResponseData>> {
    return http.get("/businesses", {
      params,
    });
  },

  async createBusiness(data: CreateBusinessRequestData): Promise<AxiosResponse<CreateBusinessResponseData>> {
    return http.post("/businesses", data);
  },
});
