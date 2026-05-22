import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserBill } from "../../services/userBill.service";

export const useUpdateTenantBill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserBill,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["users-bills"] });
    },
  });
};
