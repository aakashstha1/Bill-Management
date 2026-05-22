export type Bill = {
  readonly _id: string;
  createdBy: string;
  units: number;
  total_amount: number;
  paid_amount: number;
  discount: number;
  final_amount: number;
  service_charge: number;
  month: string;
  year: number;
  bill_type: string;
  paid_date: string;
};

export type Bills = {
  bills: Bill[];
};

export type CreateBill = {
  bill_type: string;
  month: string;
  year: number;
  units: number;
  total_amount: number;
  service_charge: number;
  paid_amount: number;
  date?: string;
};

export type CreateBillResponse = {
  success: boolean;
  message: string;
  bill: Bill;
};

export type UpdateBillPayload = {
  id: string;
  bill_type?: string;
  month?: string;
  year?: number;
  units?: number;
  paid_amount?: number;
  total_amount?: number;
  service_charge?: number;
  paid_date?: string;
};

export type UpdateBillResponse = {
  success: boolean;
  message: string;
  bill: Bill;
};

export type DeleteBillResponse = {
  success: boolean;
  message: string;
  bill: Bill;
};
