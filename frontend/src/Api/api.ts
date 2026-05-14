import axios, { type AxiosInstance } from "axios";
import { API_URL } from "../../config";
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default api;
