import api from "../app/axios";

export const loginApi = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};