// import { toSnakeCase } from "@/utils/data-transformers";
import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { LocalStorageService } from "./local-storage";
import { toast } from "sonner";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,

  transformRequest: [
    (data: unknown): string | unknown => {
      // if (data && typeof data === "object") {
      //   // console.log(toSnakeCase(data));
      //   return toSnakeCase<unknown>(data);
      // }
      return data;
    },
    ...(axios.defaults.transformRequest as Array<(data: unknown) => unknown>),
  ],

  transformResponse: [
    ...(axios.defaults.transformResponse as Array<(data: unknown) => unknown>),
    (data: unknown): unknown => {
      // if (data && typeof data === "object") {
      //   // console.log(toCamelCase(data));
      //   return toCamelCase<unknown>(data);
      // }
      return data;
    },
  ],
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const accessToken = LocalStorageService.get("accessToken");

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: Error): Promise<Error> => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const message = (error.response?.data as any)?.message || error.message;

    // Avoid showing error if you're on login route
    if (
      typeof window !== "undefined" &&
      window.location.pathname === "/login"
    ) {
      toast.error(message || "Something went wrong.");

      return Promise.reject(error);
    }

    // Handle specific status codes
    if (status === 401) {
      LocalStorageService.clear();
      toast.error("Session expired. Please log in again.");
      window.location.href = "/login";
    } else if (status === 403) {
      toast.error("You do not have permission to perform this action.");
    } else if (status === 500) {
      toast.error("Internal Server Error. Please try again later.");
    } else {
      toast.error(message || "Something went wrong.");
    }

    return Promise.reject(error);
  }
);
