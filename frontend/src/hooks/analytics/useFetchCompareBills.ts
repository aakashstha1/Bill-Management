import { useQuery } from "@tanstack/react-query";
import { compareBills } from "../../services/analytics.service";
import type { CompareBillsResponse } from "../../types/analytics.types";

export const useFetchCompareBills = () => {
  return useQuery<CompareBillsResponse>({
    queryKey: ["compare-bills"],
    queryFn: compareBills,
  });
};
