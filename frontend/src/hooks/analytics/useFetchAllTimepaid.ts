import { useQuery } from "@tanstack/react-query";
import { fetchAllTimePaidBills } from "../../services/analytics.service";
import type { PaidAnalyticsResponse } from "../../types/analytics.types";

export const useFetchAllTimePaid = () => {
  return useQuery<PaidAnalyticsResponse>({
    queryKey: ["paid-bills", "all-time"],
    queryFn: fetchAllTimePaidBills,
  });
};
