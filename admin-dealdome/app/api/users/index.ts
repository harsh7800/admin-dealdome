import { axiosInstance } from "@/services/api-client";

export const getUsers = async () => {
  const response = await axiosInstance.get("/users");
  return response.data.data.users;
};

export const deleteUser = async (id: string) => {
  const response = await axiosInstance.delete(`/users/${id}`);
  return response.data.data;
};
