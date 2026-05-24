import { useQuery } from "@tanstack/react-query";
import { fetchOwnerPaidBills } from "../../services/analytics.service";
import type {
  AnalyticsQueryParams,
  OwnerPaidAnalyticsResponse,
} from "../../types/analytics.types";

export const useFetchOwnerPaid = (params?: AnalyticsQueryParams) => {
  return useQuery<OwnerPaidAnalyticsResponse>({
    queryKey: ["owner-paid", params?.year, params?.month],
    queryFn: () => fetchOwnerPaidBills(params),
  });
};
