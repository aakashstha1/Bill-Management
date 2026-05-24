import {
  Bar,
  BarChart as RechartsBarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { PaidAnalyticsData } from "../../types/analytics.types";

type Props = {
  data?: PaidAnalyticsData;
  title?: string;
};

function BillsBarChart({ data, title = "Paid by bill type" }: Props) {
  const chartData = [
    {
      name: "Bills",
      Electricity: data?.electricity_paid ?? 0,
      Water: data?.water_paid ?? 0,
    },
  ];

  return (
    <div className="w-full h-80 bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height="90%">
        <RechartsBarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar name="Electricity" dataKey="Electricity" fill="#3b82f6" />
          <Bar name="Water" dataKey="Water" fill="#10b981" />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BillsBarChart;
