// Utilities
import Model from "@/libs/model";
import { Expose } from "class-transformer";

export enum AdminState {
  Active = "active",
  UnActive = "unActive",
}

export enum AdminRole {
  Admin = "admin",
  System = "system",
}

export default class Admin extends Model {
  @Expose() id: number = 0;
  @Expose() username: string = "";
  @Expose() password: string = "";
  @Expose() type: AdminRole = AdminRole.Admin;
  @Expose() state: AdminState = AdminState.UnActive;

  @Expose() createdDate: Date | null = null;
  @Expose() updatedDate: Date | null = null;
  @Expose() deletedDate: Date | null = null;
}
