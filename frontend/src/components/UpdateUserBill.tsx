import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { FieldGroup } from "./ui/field";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import FormInput from "./shared/FormInput";
import FormSelect from "./shared/FormSelect";

import { useFetchActiveUsers } from "../hooks/users/useFetchUsers";
import { useUpdateTenantBill } from "../hooks/tenant-bills/useUpdateTenantBill";
import type {
  TenantBill,
  UpdateTenantBillPayload,
} from "../types/tenantBill.types";

const monthOptions = [
  { label: "Baisakh", value: "baisakh" },
  { label: "Jestha", value: "jestha" },
  { label: "Ashadh", value: "ashadh" },
  { label: "Shrawan", value: "shrawan" },
  { label: "Bhadra", value: "bhadra" },
  { label: "Ashwin", value: "ashwin" },
  { label: "Kartik", value: "kartik" },
  { label: "Mangsir", value: "mangsir" },
  { label: "Poush", value: "poush" },
  { label: "Magh", value: "magh" },
  { label: "Falgun", value: "falgun" },
  { label: "Chaitra", value: "chaitra" },
];

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bill: TenantBill | null;
};

function UpdateUserBill({ open, onOpenChange, bill }: Props) {
  const { mutate, isPending } = useUpdateTenantBill();
  const { data, isLoading } = useFetchActiveUsers();

  const TenantsList =
    data?.users?.map((item) => ({
      label: item.name,
      value: item._id,
    })) || [];

  const [formData, setFormData] = useState({
    user: bill?.user
      ? typeof bill.user === "string"
        ? bill.user
        : bill.user._id
      : "",
    month: bill?.month || "",
    year: String(bill?.year || ""),
    ele_units: String(bill?.ele_units || ""),
    ele_rate: String(bill?.ele_rate || ""),
    water_amount: String(bill?.water_amount || ""),
    room_amount: String(bill?.room_amount || ""),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!bill) return;

    const payload: UpdateTenantBillPayload = {
      id: bill._id,
      user: formData.user,
      ele_units: Number(formData.ele_units),
      ele_rate: Number(formData.ele_rate),
      water_amount: Number(formData.water_amount),
      room_amount: Number(formData.room_amount),
      month: formData.month,
      year: Number(formData.year),
    };

    mutate(payload, {
      onSuccess: (data) => {
        toast.success(data?.message || "Bill updated successfully");
        onOpenChange(false);
      },
      onError: (err: unknown) => {
        const error = err as AxiosError<{ message: string }>;
        toast.error(error?.response?.data?.message || "Failed to update bill");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="font-bold text-lg">
              Update Tenant Bill
            </DialogTitle>
          </DialogHeader>

          <FieldGroup className="gap-4 mt-4">
            <FormSelect
              id="tenant"
              name="tenant"
              label="Tenant"
              required
              isLoading={isLoading}
              value={formData.user}
              options={TenantsList}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, user: value }))
              }
            />

            <FormSelect
              id="month"
              name="month"
              label="Billing Month"
              required
              value={formData.month}
              options={monthOptions}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, month: value }))
              }
            />

            <FormInput
              id="year"
              name="year"
              label="Billing Year"
              type="number"
              required
              value={formData.year}
              onChange={handleChange}
            />

            <FormInput
              id="ele_units"
              name="ele_units"
              label="Electricity Units"
              type="number"
              required
              value={formData.ele_units}
              onChange={handleChange}
            />

            <FormInput
              id="ele_rate"
              name="ele_rate"
              label="Electricity Rate"
              type="number"
              required
              value={formData.ele_rate}
              onChange={handleChange}
            />

            <FormInput
              id="water_amount"
              name="water_amount"
              label="Water Amount"
              type="number"
              required
              value={formData.water_amount}
              onChange={handleChange}
            />

            <FormInput
              id="room_amount"
              name="room_amount"
              label="Room Amount"
              type="number"
              required
              value={formData.room_amount}
              onChange={handleChange}
            />
          </FieldGroup>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateUserBill;
