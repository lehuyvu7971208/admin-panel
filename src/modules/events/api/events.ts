import { AxiosInstance, AxiosResponse } from "axios";

export type FindAllEventsParamsData = {
  state?: string;
  queueName?: string;
  processName?: string;
  
  limit: number;
  offset: number;
}

export type FindAllEventsResponseData = ResponsePagination<{
  events: Array<any>;
}>

export type FindAllQueueNamesResponseData = {
  queueNames: Array<string>;
}

export type FindAllProcessNamesResponseData = {
  processNames: Array<string>;
}

export const eventsApi = (http: AxiosInstance) => ({
  async findAllEvents(params: FindAllEventsParamsData): Promise<AxiosResponse<FindAllEventsResponseData>> {
    return await http.get("/events", {
      params
    });
  },

  async findAllQueueNames(): Promise<AxiosResponse<FindAllQueueNamesResponseData>> {
    return await http.get("/events/queue-name");
  },

  async findAllProcessNames(): Promise<AxiosResponse<FindAllProcessNamesResponseData>> {
    return await http.get("/events/process-name");
  }
});