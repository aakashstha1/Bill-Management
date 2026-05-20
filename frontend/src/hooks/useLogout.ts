import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutAPI } from "../services/auth.service";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      queryClient.setQueryData(["me"], null);
    },
  });
};
