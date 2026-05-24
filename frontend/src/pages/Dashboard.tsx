import { useMemo, useState } from "react";
import { HashLoader } from "react-spinners";
import BillsBarChart from "../components/charts/BarChart";
import LineChartComponent from "../components/charts/LineChartComponent";
import OwnerStatCard from "../components/charts/OwnerStatCard";
import PieChartComponent from "../components/charts/PieChartComponent";
import StatCard from "../components/charts/StatCard";
import FormSelect from "../components/shared/FormSelect";
import { useFetchAllTimePaid } from "../hooks/analytics/useFetchAllTimepaid";
import { useFetchBothPaid } from "../hooks/analytics/useFetchBothPaid";
import { useFetchCompareBills } from "../hooks/analytics/useFetchCompareBills";
import { useFetchOwnerPaid } from "../hooks/analytics/useFetchOwnerPaid";
import { useFetchPaidAnalyticsData } from "../hooks/analytics/useFetchPaidAnalyticsData";
import {
  buildNepaliLineChartData,
  buildPieChartData,
  formatChartBsYear,
} from "../utils/NepaliChart";
import {
  formatBsDate,
  formatBsPeriodLabel,
  getCurrentBsYear,
  getNepaliMonthSelectOptions,
  getNepaliYearSelectOptions,
  getTodayBs,
} from "../utils/nepaliDate";

const todayBs = getTodayBs();
const defaultYear = String(getCurrentBsYear());

function Dashboard() {
  const [year, setYear] = useState(defaultYear);
  const [month, setMonth] = useState("all");

  const queryParams = useMemo(
    () => ({
      year: Number(year),
      ...(month !== "all" && { month }),
    }),
    [year, month],
  );

  const periodLabel = formatBsPeriodLabel(Number(year), month);
  const compareCurrentYear = getCurrentBsYear();
  const comparePreviousYear = compareCurrentYear - 1;

  const { data: allTimeData, isLoading: allTimeLoading } =
    useFetchAllTimePaid();
  const { data: paidData, isLoading: paidLoading } =
    useFetchPaidAnalyticsData(queryParams);
  const { data: ownerData, isLoading: ownerLoading } =
    useFetchOwnerPaid(queryParams);
  const { data: compareData, isLoading: compareLoading } =
    useFetchCompareBills();
  const { data: bothData, isLoading: bothLoading } =
    useFetchBothPaid(queryParams);

  const chartData = buildNepaliLineChartData(compareData?.data ?? []);
  const pieData = buildPieChartData(
    bothData?.data.users ?? [],
    bothData?.data.owner ?? { name: "Owner", total_paid: 0 },
  );

  const isPeriodLoading = paidLoading || ownerLoading || bothLoading;
  const isPageLoading =
    allTimeLoading || compareLoading || isPeriodLoading;

  if (isPageLoading) {
    return (
      <div className="min-h-96 flex items-center justify-center">
        <HashLoader size="25px" color="#4f38f7" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
        <h1 className="font-bold text-2xl relative inline-block">
        Analytics Dashboard
        <span className="absolute left-0 -bottom-1 w-10 h-1 bg-amber-300 rounded-full"></span>
      </h1>
          <p className="text-lg text-muted-foreground mt-10">
            Today: {formatBsDate(todayBs, { includeWeekday: true })}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full sm:w-auto sm:min-w-[320px]">
          <FormSelect
            id="year"
            name="year"
            label="Year (BS)"
            value={year}
            options={getNepaliYearSelectOptions()}
            onChange={setYear}
          />
          <FormSelect
            id="month"
            name="month"
            label="Month"
            value={month}
            options={getNepaliMonthSelectOptions()}
            onChange={setMonth}
          />
        </div>
      </div>

      <StatCard
        analytics={allTimeData?.data}
        title="All-time paid"
      />

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Period: {periodLabel}</h2>

        <StatCard
          analytics={paidData?.data}
          title="Total paid this period"
        />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <BillsBarChart
            data={paidData?.data}
            title="Electricity vs water (paid)"
          />
          <PieChartComponent
            data={pieData}
            title="Payment share (tenants vs owner)"
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-medium">
            Owner payments ({periodLabel})
          </h3>
          <OwnerStatCard analytics={ownerData?.data} />
        </div>
      </section>

      <LineChartComponent
        data={chartData}
        currentYearLabel={formatChartBsYear(compareCurrentYear)}
        previousYearLabel={formatChartBsYear(comparePreviousYear)}
      />

      <p className="text-xs text-muted-foreground">
        Year and month filters use the Bikram Sambat (BS) calendar. Month names
        follow the Nepali billing cycle (Baisakh through Chaitra).
      </p>
    </div>
  );
}

export default Dashboard;
