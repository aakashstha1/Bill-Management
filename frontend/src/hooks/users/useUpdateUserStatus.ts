import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStatus } from "../../services/user.service";
export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateStatus,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
