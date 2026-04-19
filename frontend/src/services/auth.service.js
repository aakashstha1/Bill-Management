import api from "@/Api/api";

export const loginAPI = async ({ email, password }) => {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
};

export const getMeAPI = async () => {
  return await api.get("/me");
};

export const logoutAPI = async () => {
  await api.post("/auth/logout");
};

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Refresh access token using refresh token
 * @param {string} refreshToken - Refresh token

/*******  37d1cf87-6cd8-4b32-af7f-2b2f94674edb  *******/

export const refreshAccessTokenAPI = async (refreshToken) => {
  const { data } = await api.post("/auth/refresh-token", { refreshToken });
  return data.accessToken;
};
