export type TenantBill = {
  readonly _id: string;
  user: {
    _id: string;
    name: string;
  };
  ele_units: number;
  ele_rate: number;
  ele_amount: number;
  water_amount: number;
  room_amount: number;
  final_amount: number;
  paid: boolean;
  month: string;
  year: number;
};

export type TenantBillPopulated = Omit<TenantBill, "user"> & {
  user: {
    _id: string;
    name: string;
  };
};

export type TenantBills = {
  usersBills: TenantBill[];
};

export type CreateTenantBill = {
  user: string;
  ele_units: number;
  ele_rate: number;
  water_amount: number;
  room_amount: number;
  month: string;
  year: number;
};

export type UpdateTenantBillPayload = {
  id: string;
  user?: string;
  month?: string;
  year?: number;
  ele_units?: number;
  ele_rate?: number;
  water_amount?: number;
  room_amount?: number;
};

export type CreateTenantBillResponse = {
  success: boolean;
  message: string;
  bill: TenantBill;
};

export type UpdateTenantBillResponse = {
  success: boolean;
  message: string;
  bill: TenantBill;
};

export type DeleteTenantBillResponse = {
  success: boolean;
  message: string;
  userBill: TenantBill;
};

export type UpdateBillStatusPayload = {
  id: string;
  paid: boolean;
};

export type UpdateBillStatusResponse = {
  success: boolean;
  message: string;
  paid: boolean;
};
