import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import type {
  NameType,
  Payload,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type Slice = {
  name: string;
  value: number;
};

type Props = {
  data: Slice[];
  title?: string;
};

const PALETTE = [
  { fill: "#818cf8", bg: "#818cf822" }, // indigo
  { fill: "#34d399", bg: "#34d39922" }, // emerald
  { fill: "#fb923c", bg: "#fb923c22" }, // orange
  { fill: "#f472b6", bg: "#f472b622" }, // pink
  { fill: "#38bdf8", bg: "#38bdf822" }, // sky
  { fill: "#a78bfa", bg: "#a78bfa22" }, // violet
  { fill: "#facc15", bg: "#facc1522" }, // yellow
  { fill: "#4ade80", bg: "#4ade8022" }, // green
];

type CustomTooltipProps = {
  active?: boolean;
  payload?: Payload<ValueType, NameType>[];
};

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  const value = typeof item.value === "number" ? item.value : 0;
  const total =
    typeof payload[0]?.payload?.total === "number"
      ? payload[0].payload.total
      : 1;

  return (
    <div className="rounded-xl border border-border/60 bg-background/95 shadow-xl backdrop-blur-sm p-3 text-sm space-y-1">
      <p className="font-semibold text-foreground">{item.name}</p>
      <p className="text-muted-foreground">
        <span className="font-semibold tabular-nums text-foreground">
          {value.toLocaleString()}
        </span>{" "}
        · {Math.round((value / total) * 100)}%
      </p>
    </div>
  );
}

function EmptyState() {
  return (
    <Card className="border border-border/60 shadow-sm">
      <CardContent className="flex h-72 flex-col items-center justify-center gap-3 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <svg
            className="h-5 w-5 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">No payment data</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            No records found for this period.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function PieChartComponent({
  data,
  title = "Payment share",
}: Props) {
  if (data.length === 0) return <EmptyState />;

  const total = data.reduce((sum, d) => sum + d.value, 0);
  const enriched = data.map((d) => ({ ...d, total }));

  return (
    <Card className="border border-border/60 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2.5">
          <span className="w-1 h-5 rounded-full bg-linear-to-b from-indigo-400 to-emerald-400" />
          <CardTitle className="text-base font-semibold tracking-tight">
            {title}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Chart */}
          <div className="w-full sm:w-auto shrink-0">
            <ResponsiveContainer width={220} height={220}>
              <PieChart>
                <Pie
                  data={enriched}
                  cx="50%"
                  cy="50%"
                  innerRadius={58}
                  outerRadius={98}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {enriched.map((_, index) => (
                    <Cell
                      key={index}
                      fill={PALETTE[index % PALETTE.length].fill}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-2 w-full">
            {enriched.map((slice, index) => {
              const color = PALETTE[index % PALETTE.length];
              const pct = Math.round((slice.value / total) * 100);
              return (
                <div key={slice.name} className="flex items-center gap-3">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ background: color.fill }}
                  />
                  <span className="text-sm text-muted-foreground flex-1 truncate">
                    {slice.name}
                  </span>
                  <span className="text-sm font-semibold tabular-nums text-foreground">
                    {slice.value.toLocaleString()}
                  </span>
                  <span
                    className="text-xs font-medium rounded-md px-1.5 py-0.5 tabular-nums"
                    style={{ background: color.bg, color: color.fill }}
                  >
                    {pct}%
                  </span>
                </div>
              );
            })}

            {/* Total row */}
            <div className="mt-1 border-t border-border/50 pt-2 flex items-center justify-between">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                Total
              </span>
              <span className="text-sm font-bold tabular-nums text-foreground">
                {total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
