import {
  getNepaliMonthByApiValue,
  NEPALI_MONTHS,
} from "./nepaliDate";

export type LineChartPoint = {
  month: string;
  currentYear: number;
  previousYear: number;
};

export const buildNepaliLineChartData = (
  apiData: LineChartPoint[],
): LineChartPoint[] => {
  const map: Record<string, LineChartPoint> = {};

  apiData.forEach((item) => {
    const monthMeta = getNepaliMonthByApiValue(item.month);
    const english = monthMeta?.english ?? item.month;

    map[english] = {
      month: english,
      currentYear: item.currentYear || 0,
      previousYear: item.previousYear || 0,
    };
  });

  return NEPALI_MONTHS.map((m) => ({
    month: m.english,
    currentYear: map[m.english]?.currentYear ?? 0,
    previousYear: map[m.english]?.previousYear ?? 0,
  }));
};

export const buildPieChartData = (
  users: { name: string; total_paid: number }[],
  owner: { name: string; total_paid: number },
) => {
  const slices = users
    .filter((u) => u.total_paid > 0)
    .map((u) => ({ name: u.name, value: u.total_paid }));

  if (owner.total_paid > 0) {
    slices.push({ name: owner.name, value: owner.total_paid });
  }

  return slices;
};

export const formatChartBsYear = (year: number) => `BS ${year}`;
