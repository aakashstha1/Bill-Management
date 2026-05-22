import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBillStatus } from "../../services/userBill.service";

export const useUpdateTenantBillStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBillStatus,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users-bills"] });
    },
  });
};
