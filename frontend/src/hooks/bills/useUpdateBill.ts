import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMyBill } from "../../services/bill.service";

export const useUpdateBill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateMyBill,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["bills"] });
    },
  });
};
