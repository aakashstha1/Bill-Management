import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type {
  NameType,
  Payload,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { PaidAnalyticsData } from "../../types/analytics.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoltLightning, faDroplet } from "@fortawesome/free-solid-svg-icons";

type Props = {
  data?: PaidAnalyticsData;
  title?: string;
};

const ELECTRICITY_COLOR = "#f59e0b";
const WATER_COLOR = "#38bdf8";

type CustomTooltipProps = {
  active?: boolean;
  payload?: Payload<ValueType, NameType>[];
};

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-border/60 bg-background/95 shadow-xl backdrop-blur-sm p-3 text-sm space-y-1.5">
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ background: entry.color }}
          />
          <span className="text-muted-foreground">{entry.name}:</span>
          <span className="font-semibold tabular-nums text-foreground">
            {entry.value?.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

function LegendItem({
  color,
  icon,
  label,
  value,
}: {
  color: string;
  icon: typeof faBoltLightning;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="flex h-6 w-6 items-center justify-center rounded-lg"
        style={{ background: `${color}22` }}
      >
        <FontAwesomeIcon icon={icon} style={{ color }} className="h-3 w-3" />
      </span>
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="ml-1 text-xs font-semibold tabular-nums text-foreground">
        {value.toLocaleString()}
      </span>
    </div>
  );
}

function BillsBarChart({ data, title = "Paid by bill type" }: Props) {
  const electricity = data?.electricity_paid ?? 0;
  const water = data?.water_paid ?? 0;

  const chartData = [{ name: "Bills", Electricity: electricity, Water: water }];

  return (
    <Card className="border border-border/60 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-1 h-5 rounded-full bg-linear-to-b from-amber-400 to-sky-400" />
            <CardTitle className="text-base font-semibold tracking-tight">
              {title}
            </CardTitle>
          </div>
          <div className="flex items-center gap-4">
            <LegendItem
              color={ELECTRICITY_COLOR}
              icon={faBoltLightning}
              label="Electricity"
              value={electricity}
            />
            <LegendItem
              color={WATER_COLOR}
              icon={faDroplet}
              label="Water"
              value={water}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        <ResponsiveContainer width="100%" height={220}>
          <RechartsBarChart
            data={chartData}
            barCategoryGap="40%"
            margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="hsl(var(--border))"
              opacity={0.5}
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ opacity: 0.06, fill: "hsl(var(--foreground))" }}
            />
            <Bar
              name="Electricity"
              dataKey="Electricity"
              fill={ELECTRICITY_COLOR}
              radius={[6, 6, 0, 0]}
              maxBarSize={56}
            />
            <Bar
              name="Water"
              dataKey="Water"
              fill={WATER_COLOR}
              radius={[6, 6, 0, 0]}
              maxBarSize={56}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default BillsBarChart;
