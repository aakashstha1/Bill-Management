import api from "../Api/api";
import {
  type Bills,
  type CreateBill,
  type CreateBillResponse,
  type DeleteBillResponse,
  type UpdateBillPayload,
  type UpdateBillResponse,
} from "../types/bill.types";

export const fetchMyBills = async (): Promise<Bills> => {
  const { data } = await api.get<Bills>("/bills");
  // console.log(data);
  return data;
};

export const createMyBill = async (
  bill: CreateBill,
): Promise<CreateBillResponse> => {
  const { data } = await api.post("/bills", bill);
  return data;
};

export const updateMyBill = async ({
  id,
  ...payload
}: UpdateBillPayload): Promise<UpdateBillResponse> => {
  const { data } = await api.patch<UpdateBillResponse>(`/bills/${id}`, payload);
  return data;
};

export const deleteMyBill = async (id: string): Promise<DeleteBillResponse> => {
  const { data } = await api.delete<DeleteBillResponse>(`/bills/${id}`);
  return data;
};
