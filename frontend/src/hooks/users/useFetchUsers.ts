import { useQuery } from "@tanstack/react-query";
import { fetchActiveUsers, fetchUsers } from "../../services/user.service";
import type { Users } from "../../types/user.types";

export const useFetchUsers = () => {
  return useQuery<Users>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};

export const useFetchActiveUsers = () => {
  return useQuery<Users>({
    queryKey: ["users"],
    queryFn: fetchActiveUsers,
  });
};
