import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginAPI } from "../services/auth.service";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginAPI,

    onSuccess: async () => {
      // update cached user
      await queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
