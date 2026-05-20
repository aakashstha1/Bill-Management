import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../services/user.service";
import type { Users } from "../../types/user.types";

export const useFetchUsers = () => {
  return useQuery<Users>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};
