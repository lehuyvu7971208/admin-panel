import http from '@/api/index';
import { AxiosResponse } from 'axios';

export type User = {
  id: number;
  email: string;
  username: string;
  lastName: string;
  firstName: string;
  phoneRegion: string;
  phoneNumber: string;
  
  createdDate: Date;
  updatedDate: Date;
  deletedDate: Date;
}

export type FindAllResponseData = {
  users: Array<User>
}

export const findAll = async (): Promise<AxiosResponse<FindAllResponseData>> => {
  return http.get('/users');
};