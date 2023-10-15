import http from "@/api/index";
import { AxiosResponse } from "axios";

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
};

export type FindAllUsersResponseData = {
  users: Array<User>;
};

export const findAllUsers = async (): Promise<AxiosResponse<FindAllUsersResponseData>> => {
  return http.get("/users");
};

export type FindUserResponseData = {
  user: User;
};

export const findUser = async (id: number | string): Promise<AxiosResponse<FindUserResponseData>> => {
  return http.get(`/users/${id}`);
};

export type CreateUserRequestData = {
  email: string;
  username: string;
  password: string;
  lastName: string;
  firstName: string;
  phoneRegion: string;
  phoneNumber: string;
};

export type CreateUserResponseData = {
  user: User;
};

export const createUser = async (data: CreateUserRequestData): Promise<AxiosResponse<CreateUserResponseData>> => {
  return http.post("/users", data);
};

export type PatchUserRequestData = {
  lastName?: string;
  firstName?: string;
  phoneRegion?: string;
  phoneNumber?: string;
};

export type PatchUserResponseData = {
  user: User;
};

export const patchUser = async (id: number | string, data: PatchUserRequestData): Promise<AxiosResponse<PatchUserResponseData>> => {
  return http.patch(`/users/${id}`, data);
};
