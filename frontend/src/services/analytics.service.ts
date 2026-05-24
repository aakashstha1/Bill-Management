import api from "../Api/api";
import type {
  AnalyticsQueryParams,
  BothPaidAnalyticsResponse,
  CompareBillsResponse,
  OwnerPaidAnalyticsResponse,
  PaidAnalyticsResponse,
} from "../types/analytics.types";

export const fetchPaidBills = async (
  params?: AnalyticsQueryParams,
): Promise<PaidAnalyticsResponse> => {
  const { data } = await api.get<PaidAnalyticsResponse>(
    "/analytics/owner/paid",
    { params },
  );
  return data;
};

export const fetchAllTimePaidBills =
  async (): Promise<PaidAnalyticsResponse> => {
    const { data } = await api.get<PaidAnalyticsResponse>(
      "/analytics/owner/paid/all-time",
    );
    return data;
  };

export const fetchOwnerPaidBills = async (
  params?: AnalyticsQueryParams,
): Promise<OwnerPaidAnalyticsResponse> => {
  const { data } = await api.get<OwnerPaidAnalyticsResponse>(
    "/analytics/owner/owner-paid",
    { params },
  );
  return data;
};

export const compareBills = async (): Promise<CompareBillsResponse> => {
  const { data } = await api.get<CompareBillsResponse>(
    "/analytics/owner/compare",
  );
  return data;
};

export const fetchBothPaidAnalytics = async (
  params?: AnalyticsQueryParams,
): Promise<BothPaidAnalyticsResponse> => {
  const { data } = await api.get<BothPaidAnalyticsResponse>(
    "/analytics/owner/both",
    { params },
  );
  return data;
};
