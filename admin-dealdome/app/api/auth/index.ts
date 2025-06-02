import { axiosInstance } from "@/services/api-client";
import { authQueries } from "@/react-query/auth";
import { LocalStorageService } from "@/services/local-storage";
import type { LoginBody, LoginResponse } from "@/interfaces/auth";

export const login = async (body: LoginBody): Promise<LoginResponse> => {
  const { data } = await axiosInstance.post(authQueries.login.endpoint, body);
  LocalStorageService.set("accessToken", data.data.accessToken);
  LocalStorageService.set("refreshToken", data.data.refreshToken);
  return data;
};

export const logout = async (): Promise<void> => {
  try {
    await axiosInstance.post(authQueries.logout.endpoint);
  } catch (error) {
    console.error("Logout API error:", error);
  } finally {
    LocalStorageService.clear();
    window.location.href = "/login";
  }
};
