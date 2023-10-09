// Utilities
import axios, { AxiosError } from "axios";

// Store
import { useAuthStore } from "@/store/auth";

type ErrorResponse = {
  error: string,
  message: string,
  statusCode: number,
}

const http = axios.create({
  baseURL: import.meta.env.PUBLIC_API_URL,
});

http.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    config.headers.setContentType('application/json');

    if (authStore.accessToken) {
      config.headers.setAuthorization(`Bearer ${authStore.accessToken}`);
    }

    return config;
  }
);

http.interceptors.response.use(
  response => response,
  (error: AxiosError<ErrorResponse>) => {
    throw new Error(error?.response?.data?.message);
  }
);

export default http;