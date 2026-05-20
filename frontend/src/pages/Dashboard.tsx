import LineChartComponent from "../components/charts/LineChartComponent";
import PieChartComponent from "../components/charts/PieChartComponent";

function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <h1>Hello, welcome to your dashboard!</h1>
      <LineChartComponent />
      <PieChartComponent />
    </div>
  );
}

export default Dashboard;
