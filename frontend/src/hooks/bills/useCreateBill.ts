import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMyBill } from "../../services/bill.service";

export const useCreateBill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMyBill,

    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["bills"] });
    },
  });
};
