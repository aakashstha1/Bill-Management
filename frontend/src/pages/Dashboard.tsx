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

function SectionHeading({
  label,
  accent = "from-amber-400 to-amber-300",
}: {
  label: string;
  accent?: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`w-1 h-5 rounded-full bg-linear-to-b ${accent} shrink-0`}
      />
      <h2 className="text-base font-semibold tracking-tight text-foreground">
        {label}
      </h2>
    </div>
  );
}

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

  const isPageLoading =
    allTimeLoading ||
    compareLoading ||
    paidLoading ||
    ownerLoading ||
    bothLoading;

  if (isPageLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3">
        <HashLoader size={28} color="#818cf8" />
        <p className="text-xs text-muted-foreground tracking-wide animate-pulse">
          Loading analytics…
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-12">
      {/* ── Page Header ───────────────────────────────────── */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Analytics Dashboard
          </h1>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {formatBsDate(todayBs, { includeWeekday: true })}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto sm:min-w-75">
          <div className="flex-1">
            <FormSelect
              id="year"
              name="year"
              label="Year (BS)"
              value={year}
              options={getNepaliYearSelectOptions()}
              onChange={setYear}
            />
          </div>
          <div className="flex-1">
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
      </div>

      {/* ── All-time Stats ─────────────────────────────────── */}
      <section className="space-y-4">
        <StatCard analytics={allTimeData?.data} title="All-time paid" />
      </section>

      {/* ── Period Stats ───────────────────────────────────── */}
      <section className="space-y-5">
        {/* Period header with badge */}
        <div className="flex items-center gap-3">
          <SectionHeading
            label="Period breakdown"
            accent="from-indigo-400 to-sky-400"
          />
          <span className="rounded-full border border-border/60 bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            {periodLabel}
          </span>
        </div>

        <StatCard analytics={paidData?.data} title="Total paid this period" />

        {/* Charts row */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <BillsBarChart
            data={paidData?.data}
            title="Electricity vs water (paid)"
          />
          <PieChartComponent
            data={pieData}
            title="Payment share (tenants vs owner)"
          />
        </div>

        {/* Owner subsection */}
        <div className="rounded-xl border border-border/60 bg-muted/30 p-5 space-y-4">
          <SectionHeading
            label={`Owner payments · ${periodLabel}`}
            accent="from-violet-400 to-violet-300"
          />
          <OwnerStatCard analytics={ownerData?.data} />
        </div>
      </section>

      {/* ── Year-over-year ─────────────────────────────────── */}
      <section className="space-y-4">
        <SectionHeading
          label="Year-over-year comparison"
          accent="from-indigo-400 to-slate-400"
        />
        <LineChartComponent
          data={chartData}
          currentYearLabel={formatChartBsYear(compareCurrentYear)}
          previousYearLabel={formatChartBsYear(comparePreviousYear)}
        />
      </section>

      {/* ── Footer note ────────────────────────────────────── */}
      <p className="text-xs text-muted-foreground border-t border-border/40 pt-4">
        Year and month filters use the Bikram Sambat (BS) calendar. Month names
        follow the Nepali billing cycle (Baisakh through Chaitra).
      </p>
    </div>
  );
}

export default Dashboard;
