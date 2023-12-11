// Utilities
import Model from "@/libs/model";

//  Apis
import { Expose } from "class-transformer";

export enum UserState {
  Active = "active",
  UnActive = "unActive",
}

export default class User extends Model {
  @Expose() id: number = 0;
  @Expose() email: string = "";
  @Expose() username: string = "";
  @Expose() password: string = "";
  @Expose() state: UserState = UserState.UnActive;

  @Expose() lastName: string = "";
  @Expose() firstName: string = "";
  @Expose() phoneNumber: string = "";
  @Expose() phoneRegion: string = "84";

  @Expose() createdDate: Date | null = null;
  @Expose() updatedDate: Date | null = null;
  @Expose() deletedDate: Date | null = null;
}
