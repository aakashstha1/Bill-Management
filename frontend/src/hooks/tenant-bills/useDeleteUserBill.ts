import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserBill } from "../../services/userBill.service";

export const useDeleteUserBill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUserBill,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["users-bills"] });
    },
  });
};
