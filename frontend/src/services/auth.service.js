import api from "@/Api/api";

export const loginAPI = async ({ email, password }) => {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
};

export const getMeAPI = async () => {
  return await api.get("/me");
};

export const logout = async () => {
  await api.post("/auth/logout");
};

export const refreshAccessToken = async (refreshToken) => {
  const { data } = await api.post("/auth/refresh-token", { refreshToken });
  return data.accessToken;
};
