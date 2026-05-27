import { useQuery } from "@tanstack/react-query";
import { getMeAPI } from "../services/auth.service";

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await getMeAPI();
      return res.data;
    },
    retry: false,
  });
};
