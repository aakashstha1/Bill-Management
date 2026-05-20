import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../../services/user.service";

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUser, // API call to create user

    // runs after successful create
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["users"] }); // refetch users list so UI updates automatically
    },
  });
};
