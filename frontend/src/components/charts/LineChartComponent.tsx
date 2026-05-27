import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type {
  NameType,
  Payload,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { LineChartPoint } from "../../utils/NepaliChart";

type Props = {
  data?: LineChartPoint[];
  currentYearLabel?: string;
  previousYearLabel?: string;
};

const CURRENT_COLOR = "#818cf8"; // indigo
const PREVIOUS_COLOR = "#94a3b8"; // slate/muted

type CustomTooltipProps = {
  active?: boolean;
  payload?: Payload<ValueType, NameType>[];
  label?: string;
};

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-border/60 bg-background/95 shadow-xl backdrop-blur-sm p-3 text-sm space-y-1.5 min-w-40">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
        {String(label)}
      </p>
      {payload.map((entry) => (
        <div
          key={entry.name}
          className="flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: entry.color }}
            />
            <span className="text-muted-foreground text-xs">{entry.name}</span>
          </div>
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
  label,
  dashed,
}: {
  color: string;
  label: string;
  dashed?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <svg width="20" height="10" viewBox="0 0 20 10">
        {dashed ? (
          <line
            x1="0"
            y1="5"
            x2="20"
            y2="5"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="4 3"
            strokeLinecap="round"
          />
        ) : (
          <line
            x1="0"
            y1="5"
            x2="20"
            y2="5"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        )}
      </svg>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

export default function LineChartComponent({
  data,
  currentYearLabel = "Current year",
  previousYearLabel = "Previous year",
}: Props) {
  return (
    <Card className="border border-border/60 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-1 h-5 rounded-full bg-linear-to-b from-indigo-400 to-slate-400" />
            <CardTitle className="text-base font-semibold tracking-tight">
              Year-over-year comparison
            </CardTitle>
          </div>
          <div className="flex items-center gap-4">
            <LegendItem color={CURRENT_COLOR} label={currentYearLabel} />
            <LegendItem
              color={PREVIOUS_COLOR}
              label={previousYearLabel}
              dashed
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        <ResponsiveContainer width="100%" height={240}>
          <LineChart
            data={data}
            margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="hsl(var(--border))"
              opacity={0.5}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <Tooltip content={<CustomTooltip />} />

            <Line
              name={currentYearLabel}
              dataKey="currentYear"
              stroke={CURRENT_COLOR}
              strokeWidth={2.5}
              dot={{ r: 3.5, fill: CURRENT_COLOR, strokeWidth: 0 }}
              activeDot={{
                r: 5,
                fill: CURRENT_COLOR,
                strokeWidth: 2,
                stroke: "hsl(var(--background))",
              }}
            />
            <Line
              name={previousYearLabel}
              dataKey="previousYear"
              stroke={PREVIOUS_COLOR}
              strokeWidth={2}
              strokeDasharray="5 4"
              dot={{ r: 3, fill: PREVIOUS_COLOR, strokeWidth: 0 }}
              activeDot={{
                r: 5,
                fill: PREVIOUS_COLOR,
                strokeWidth: 2,
                stroke: "hsl(var(--background))",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
