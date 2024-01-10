// Utilities
import { AxiosInstance, AxiosResponse } from "axios";

export type MeResponseData = {
  admin: any;
};

export type SignInRequestData = {
  username: string;
  password: string;
  userAgent?: string;
};

export type SignInResponseData = {
  accessToken: string;
};

export const authApi = (http: AxiosInstance) => ({
  async me(): Promise<AxiosResponse<MeResponseData>> {
    return http.get("/auth/me");
  },

  async signIn(data: SignInRequestData): Promise<AxiosResponse<SignInResponseData>> {
    return http.post("/auth/sign-in", data);
  },
});
