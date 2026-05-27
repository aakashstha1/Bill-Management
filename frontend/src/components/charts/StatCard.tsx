import { Card, CardContent } from "../ui/card";
import type { PaidAnalyticsData } from "../../types/analytics.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoltLightning,
  faDroplet,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";

type Props = {
  analytics?: PaidAnalyticsData;
  title?: string;
};

type StatItem = {
  label: string;
  value: number;
  icon: typeof faBoltLightning;
  iconColor: string;
  iconBg: string;
  accent: string;
  trend?: string;
};

function StatCard({ analytics, title = "All-time paid" }: Props) {
  const stats: StatItem[] = [
    {
      label: "Total Paid",
      value: analytics?.total_paid ?? 0,
      icon: faReceipt,
      iconColor: "text-violet-500",
      iconBg: "bg-violet-50 dark:bg-violet-950/40",
      accent: "from-violet-500/10 to-transparent",
    },
    {
      label: "Electricity",
      value: analytics?.electricity_paid ?? 0,
      icon: faBoltLightning,
      iconColor: "text-amber-500",
      iconBg: "bg-amber-50 dark:bg-amber-950/40",
      accent: "from-amber-500/10 to-transparent",
    },
    {
      label: "Water",
      value: analytics?.water_paid ?? 0,
      icon: faDroplet,
      iconColor: "text-sky-500",
      iconBg: "bg-sky-50 dark:bg-sky-950/40",
      accent: "from-sky-500/10 to-transparent",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <span className="w-1 h-6 rounded-full bg-linear-to-b from-amber-400 to-amber-300 shadow-sm shadow-amber-200" />
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          {title}
        </h2>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="relative overflow-hidden border border-border/60 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            {/* Subtle gradient accent top-right */}
            <div
              className={`absolute inset-0 bg-linear-to-br ${stat.accent} pointer-events-none`}
            />

            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold tabular-nums text-foreground">
                    {stat.value.toLocaleString()}
                  </p>
                </div>

                {/* Icon badge */}
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${stat.iconBg}`}
                >
                  <FontAwesomeIcon
                    icon={stat.icon}
                    className={`h-4 w-4 ${stat.iconColor}`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default StatCard;
