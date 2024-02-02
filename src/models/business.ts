// Utilities
import Model from "@/libs/model";
import { Expose, Type } from "class-transformer";

// Models
import User from "./user";

export enum BusinessState {
  Active = "active",
  UnActive = "unActive",
}

export enum BusinessType {
  Pet = "pet",
  Spa = "spa",
  None = "none",
  Hair = "hair",
  Nail = "nail",
}

export default class Business extends Model {
  @Expose() id: number = 0;
  @Expose() name: string = "";
  @Expose() owner: string = "";

  @Expose()
  @Type(() => User)
  user: User = new User();

  @Expose() type: BusinessType = BusinessType.None;
  @Expose() state: BusinessState = BusinessState.UnActive;

  @Expose() createdDate: Date | null = null;
  @Expose() updatedDate: Date | null = null;
  @Expose() deletedDate: Date | null = null;
}
