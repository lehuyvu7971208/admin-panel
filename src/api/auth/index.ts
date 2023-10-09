import http from '@/api';
import { AxiosResponse } from 'axios';

export type SignInRequestData = {
  username: string;
  password: string;
  userAgent?: string;
}

export type SignInResponseData = {
  accessToken: string;
}

export const signIn = (data: SignInRequestData): Promise<AxiosResponse<SignInResponseData>> => {
  return http.post('/auth/sign-in', data);
};