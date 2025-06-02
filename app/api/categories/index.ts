import { CategoryFormData } from "@/schemas/category";
import { axiosInstance } from "@/services/api-client";

export const getCategories = async () => {
  const response = await axiosInstance.get("/categories/tree");
  return response.data.data;
};

export const deleteCategory = async (id: string) => {
  console.log("id: ", id);
  const response = await axiosInstance.delete(`/categories/${id}`);
  return response.data;
};

export const createCategory = async (
  data: CategoryFormData
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const response = await axiosInstance.post("/categories", data);
  return response.data;
};

export const getCategoryById = async (id: string) => {
  const response = await axiosInstance.get(`/categories/${id}`);
  return response.data.data;
};

export const updateCategory = async (id: string, data: CategoryFormData) => {
  const response = await axiosInstance.put(`/categories/${id}`, data);
  return response.data.data;
};
