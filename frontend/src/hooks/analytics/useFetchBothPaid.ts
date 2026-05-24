import { useQuery } from "@tanstack/react-query";
import { fetchBothPaidAnalytics } from "../../services/analytics.service";
import type {
  AnalyticsQueryParams,
  BothPaidAnalyticsResponse,
} from "../../types/analytics.types";

export const useFetchBothPaid = (params?: AnalyticsQueryParams) => {
  return useQuery<BothPaidAnalyticsResponse>({
    queryKey: ["both-paid", params?.year, params?.month],
    queryFn: () => fetchBothPaidAnalytics(params),
  });
};
