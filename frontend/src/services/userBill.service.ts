import api from "../Api/api";
import {
  type CreateTenantBill,
  type CreateTenantBillResponse,
  type DeleteTenantBillResponse,
  type TenantBills,
  type UpdateBillStatusPayload,
  type UpdateBillStatusResponse,
  type UpdateTenantBillPayload,
  type UpdateTenantBillResponse,
} from "../types/tenantBill.types";

export const fetchTenantBills = async (): Promise<TenantBills> => {
  const { data } = await api.get<TenantBills>("/user-bills");
  return data;
};

export const createUserBill = async (
  bill: CreateTenantBill,
): Promise<CreateTenantBillResponse> => {
  const { data } = await api.post("/user-bills", bill);
  return data;
};

export const updateUserBill = async ({
  id,
  ...payload
}: UpdateTenantBillPayload): Promise<UpdateTenantBillResponse> => {
  const { data } = await api.patch<UpdateTenantBillResponse>(
    `/user-bills/${id}`,
    payload,
  );
  return data;
};

export const deleteUserBill = async (
  id: string,
): Promise<DeleteTenantBillResponse> => {
  const { data } = await api.delete<DeleteTenantBillResponse>(
    `/user-bills/${id}`,
  );
  return data;
};

export const updateBillStatus = async ({
  id,
  paid,
}: UpdateBillStatusPayload): Promise<UpdateBillStatusResponse> => {
  const { data } = await api.patch<UpdateBillStatusResponse>(
    `/user-bills/${id}/status`,
    { paid },
  );
  return data;
};
