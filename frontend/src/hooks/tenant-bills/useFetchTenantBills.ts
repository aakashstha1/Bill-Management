import { useQuery } from "@tanstack/react-query";
import { fetchTenantBills } from "../../services/userBill.service";
import { type TenantBills } from "../../types/tenantBill.types";

export const useFetchTenantBills = () => {
  return useQuery<TenantBills>({
    queryKey: ["users-bills"],
    queryFn: fetchTenantBills,
  });
};
