import { useQuery } from "@tanstack/react-query";
import { fetchPaidBills } from "../../services/analytics.service";
import type {
  AnalyticsQueryParams,
  PaidAnalyticsResponse,
} from "../../types/analytics.types";

export const useFetchPaidAnalyticsData = (params?: AnalyticsQueryParams) => {
  return useQuery<PaidAnalyticsResponse>({
    queryKey: ["paid-bills", params?.year, params?.month],
    queryFn: () => fetchPaidBills(params),
  });
};
