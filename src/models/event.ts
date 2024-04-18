
import Model from "@/libs/model";
import { Expose } from "class-transformer";

export enum EventState {
  Active = 'active',
  Failed = 'failed',
  Waiting = 'waiting',
  Resumed = 'resumed',
  Cleaned = 'cleaned',
  Removed = 'removed',
  Progress = 'progress',
  Completed = 'completed',
}

export default class Events extends Model {
 @Expose() id: number = 0;
 @Expose() queueName: string = "";
 @Expose() processName: string = "";

 @Expose() data: any = null;
 @Expose() exception: any = null;
 @Expose() state: EventState = EventState.Waiting;

 @Expose() createdDate: Date | null = null;
 @Expose() updatedDate: Date | null = null;
}