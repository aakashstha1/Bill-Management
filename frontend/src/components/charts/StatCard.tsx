import { Card, CardContent } from "../ui/card";
import type { PaidAnalyticsData } from "../../types/analytics.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoltLightning, faDroplet } from "@fortawesome/free-solid-svg-icons";

type Props = {
  analytics?: PaidAnalyticsData;
  title?: string;
};

function StatCard({ analytics, title = "All-time paid" }: Props) {
  return (
    <div>
<h2 className="relative flex items-center gap-2 text-lg font-semibold mb-3 pl-3">
  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-amber-300 rounded-full" />
  {title}
</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent>
            <p className="text-sm text-muted-foreground">Total paid</p>
            <h2 className="text-xl font-bold">{analytics?.total_paid ?? 0}</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <p className="text-sm text-muted-foreground">Electricity  <FontAwesomeIcon
              icon={faBoltLightning}
              style={{ color: "rgb(255, 212, 59)" }}
            /></p>
            <h2 className="text-xl font-bold">
              {analytics?.electricity_paid ?? 0}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <p className="text-sm text-muted-foreground">Water <FontAwesomeIcon
              icon={faDroplet}
              style={{ color: "rgb(116, 192, 252)" }}
            /></p>
            <h2 className="text-xl font-bold">{analytics?.water_paid ?? 0}</h2>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default StatCard;
