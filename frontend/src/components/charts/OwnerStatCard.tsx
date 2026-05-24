import { Card, CardContent } from "../ui/card";
import type { OwnerPaidAnalyticsData } from "../../types/analytics.types";
import { faBoltLightning, faDroplet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  analytics?: OwnerPaidAnalyticsData;
};

function OwnerStatCard({ analytics }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent>
          <p className="text-sm text-muted-foreground">Owner total paid</p>
          <h2 className="text-xl font-bold">
            {analytics?.total_owner_paid ?? 0}
          </h2>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <p className="text-sm text-muted-foreground">Owner electricity <FontAwesomeIcon
                          icon={faBoltLightning}
                          style={{ color: "rgb(255, 212, 59)" }}
                        /></p>
          <h2 className="text-xl font-bold">
            {analytics?.electricity_owner_paid ?? 0}
          </h2>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <p className="text-sm text-muted-foreground">Owner water <FontAwesomeIcon
                          icon={faDroplet}
                          style={{ color: "rgb(116, 192, 252)" }}
                        /></p>
          <h2 className="text-xl font-bold">
            {analytics?.water_owner_paid ?? 0}
          </h2>
        </CardContent>
      </Card>
    </div>
  );
}

export default OwnerStatCard;
