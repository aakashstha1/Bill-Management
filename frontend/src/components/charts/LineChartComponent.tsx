import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { LineChartPoint } from "../../utils/NepaliChart";

type Props = {
  data?: LineChartPoint[];
  currentYearLabel?: string;
  previousYearLabel?: string;
};

export default function LineChartComponent({
  data,
  currentYearLabel = "Current year",
  previousYearLabel = "Previous year",
}: Props) {
  return (
    <div className="w-full h-96 bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-4">
        Year-over-year paid comparison
      </h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip labelFormatter={(label) => String(label)} />
          <Legend />

          <Line
            name={currentYearLabel}
            dataKey="currentYear"
            stroke="#3b82f6"
            strokeWidth={2}
          />
          <Line
            name={previousYearLabel}
            dataKey="previousYear"
            stroke="#ef4444"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
