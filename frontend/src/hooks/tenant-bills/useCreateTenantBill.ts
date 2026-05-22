import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  createUserBill } from "../../services/userBill.service";

export const useCreateTenantBill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUserBill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users-bills"] });
    },
  });
};
