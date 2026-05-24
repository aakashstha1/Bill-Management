export type AnalyticsQueryParams = {
  year?: number;
  month?: string;
};

export type PaidAnalyticsData = {
  total_paid: number;
  electricity_paid: number;
  water_paid: number;
};

export type PaidAnalyticsResponse = {
  success: boolean;
  data: PaidAnalyticsData;
};

export type OwnerPaidAnalyticsData = {
  year: number;
  month: string;
  total_owner_paid: number;
  electricity_owner_paid: number;
  water_owner_paid: number;
};

export type OwnerPaidAnalyticsResponse = {
  success: boolean;
  data: OwnerPaidAnalyticsData;
};

export type CompareBillMonth = {
  month: string;
  currentYear: number;
  previousYear: number;
};

export type CompareBillsResponse = {
  success: boolean;
  data: CompareBillMonth[];
};

export type PaidShareItem = {
  name: string;
  total_paid: number;
  percent: number;
};

export type BothPaidAnalyticsData = {
  users: PaidShareItem[];
  owner: PaidShareItem;
  total_main: number;
};

export type BothPaidAnalyticsResponse = {
  success: boolean;
  data: BothPaidAnalyticsData;
};
