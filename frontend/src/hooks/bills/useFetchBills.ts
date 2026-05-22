import { useQuery } from "@tanstack/react-query";
import { type Bills } from "../../types/bill.types";
import { fetchMyBills } from "../../services/bill.service";

export const useFetchBills = () => {
  return useQuery<Bills>({
    queryKey: ["bills"],
    queryFn: fetchMyBills,
  });
};
