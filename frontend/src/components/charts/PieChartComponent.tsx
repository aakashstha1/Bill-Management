import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type Slice = {
  name: string;
  value: number;
};

type Props = {
  data: Slice[];
  title?: string;
};

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
  "#f97316",
];

export default function PieChartComponent({
  data,
  title = "Payment share (tenants vs owner)",
}: Props) {
  if (data.length === 0) {
    return (
      <div className="w-full h-96 bg-white rounded-xl shadow p-4 flex items-center justify-center text-muted-foreground">
        No payment data for this period
      </div>
    );
  }

  return (
    <div className="w-full h-96 bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>

      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            label={({ name, percent }) =>
              `${name} (${Math.round((percent ?? 0) * 100)}%)`
            }
            outerRadius={110}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
