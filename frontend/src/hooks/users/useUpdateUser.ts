// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { updateUser } from "../../services/user.service";

// export const useUpdateUser = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: updateUser,

//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["users"] });
//     },
//   });
// };
