import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { FieldGroup } from "./ui/field";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import FormInput from "./shared/FormInput";
import FormSelect from "./shared/FormSelect";

import { useFetchActiveUsers } from "../hooks/users/useFetchUsers";
import { useCreateTenantBill } from "../hooks/tenant-bills/useCreateTenantBill";
import type { CreateTenantBill } from "../types/tenantBill.types";

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

function CreateUserBill() {
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useCreateTenantBill();
  const { data, isLoading } = useFetchActiveUsers();
  // console.log(data);

  const TenantsList =
    data?.users?.map((item) => ({
      label: item.name,
      value: item._id,
    })) || [];

  const [formData, setFormData] = useState({
    user: "",
    month: "",
    year: "",
    ele_units: "",
    ele_rate: "",
    water_amount: "",
    room_amount: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formatBillPayload = (data: typeof formData): CreateTenantBill => ({
      user: data.user,
      ele_units: Number(data.ele_units),
      ele_rate: Number(data.ele_rate),
      water_amount: Number(data.water_amount),
      room_amount: Number(data.room_amount),
      month: data.month,
      year: Number(data.year),
    });

    const payload = formatBillPayload(formData);

    mutate(payload, {
      onSuccess: (data) => {
        setFormData({
          user: "",
          month: "",
          year: "",
          ele_units: "",
          ele_rate: "",
          water_amount: "",
          room_amount: "",
        });

        toast.success(data?.message || "Tenant Bill created successfully");
        setOpen(false);
      },
      onError: (err: unknown) => {
        const error = err as AxiosError<{ message: string }>;
        toast.error(
          error?.response?.data?.message || "Failed to create tenant bill",
        );
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-lg">
          Add Tenant Bill <span className="text-2xl">+</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="font-bold text-lg">
              Fill Tenant's Bill Details
            </DialogTitle>
          </DialogHeader>

          <FieldGroup className="gap-4 mt-4 ">
            <FormSelect
              id="tenant"
              name="tenant"
              label="Tanant Type"
              required
              isLoading={isLoading}
              value={formData.user}
              options={TenantsList}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  user: value,
                }))
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
                setFormData((prev) => ({
                  ...prev,
                  month: value,
                }))
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
              {isPending ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateUserBill;
