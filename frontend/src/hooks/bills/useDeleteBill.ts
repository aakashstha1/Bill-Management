import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMyBill } from "../../services/bill.service";

export const useDeleteBill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMyBill,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["bills"] });
    },
  });
};
