import api from "../Api/api";
import type { LoginData } from "../types/auth.types";

export const loginAPI = async ({ email, password }: LoginData) => {
  const { data } = await api.post("/auth/login", {
    email,
    password,
  });
  return data;
};

export const getMeAPI = async () => {
  return await api.get("/auth/me");
};

export const logoutAPI = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const refreshAccessTokenAPI = async (): Promise<void> => {
  await api.post("/auth/refresh-token");
};
