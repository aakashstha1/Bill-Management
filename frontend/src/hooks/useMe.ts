import { useQuery } from "@tanstack/react-query";
import { getMeAPI, refreshAccessTokenAPI } from "../services/auth.service";
import type { AxiosError } from "axios";

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      try {
        const res = await getMeAPI();
        return res.data;
      } catch (err: unknown) {
        const error = err as AxiosError;
        if (error.response?.status === 401) {
          await refreshAccessTokenAPI();

          const res = await getMeAPI();
          return res.data;
        }
        throw err;
      }
    },
    retry: false,
  });
};
