import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type StatusData = {
  name: string;
  value: number;
};

const data: StatusData[] = [
  { name: "Active", value: 60 },
  { name: "Inactive", value: 25 },
  { name: "Pending", value: 15 },
];

const COLORS = ["#22c55e", "#ef4444", "#f59e0b"];

export default function PieChartComponent() {
  return (
    <div className="w-full h-100 bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-4">User Status</h2>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            label
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
