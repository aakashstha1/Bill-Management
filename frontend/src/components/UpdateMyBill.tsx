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
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { Label } from "./ui/label";
import type { Bill, UpdateBillPayload } from "../types/bill.types";
import { useUpdateBill } from "../hooks/bills/useUpdateBill";

const billTypeOptions = [
  { label: "Electricity", value: "electricity" },
  { label: "Water", value: "water" },
];

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
  bill: Bill | null;
};

function UpdateMyBill({ open, onOpenChange, bill }: Props) {
  //   const [open, setOpen] = useState(false);
  const [paidDate, setPaidDate] = useState<Date | undefined>(() =>
    bill?.paid_date ? new Date(bill.paid_date) : undefined,
  );

  const { mutate, isPending } = useUpdateBill();

  const [formData, setFormData] = useState(() => ({
    bill_type: bill?.bill_type || "",
    month: bill?.month || "",
    year: String(bill?.year || ""),
    units: String(bill?.units || ""),
    total_amount: String(bill?.total_amount || ""),
    service_charge: String(bill?.service_charge || ""),
    paid_amount: String(bill?.paid_amount || ""),
  }));
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!bill) return;

    const payload: UpdateBillPayload = {
      id: bill._id,
      bill_type: formData.bill_type,
      month: formData.month,
      year: Number(formData.year),
      units: Number(formData.units),
      total_amount: Number(formData.total_amount),
      service_charge: Number(formData.service_charge),
      paid_amount: Number(formData.paid_amount),
      paid_date: paidDate ? paidDate.toISOString() : undefined,
    };

    mutate(payload, {
      onSuccess: (data) => {
        setFormData({
          bill_type: "",
          month: "",
          year: "",
          units: "",
          total_amount: "",
          service_charge: "",
          paid_amount: "",
        });

        setPaidDate(undefined);
        toast.success(data?.message || "Bill created successfully");
        onOpenChange(false);
      },
      onError: (err: unknown) => {
        const error = err as AxiosError<{ message: string }>;
        toast.error(error?.response?.data?.message || "Failed to create bill");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="font-bold text-lg">
              Fill Bill Details
            </DialogTitle>
          </DialogHeader>

          <FieldGroup className="gap-4 mt-4 grid grid-cols-2">
            <FormSelect
              id="bill_type"
              name="bill_type"
              label="Bill Type"
              required
              value={formData.bill_type}
              options={billTypeOptions}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  bill_type: value,
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
              id="units"
              name="units"
              label="Units"
              type="number"
              required
              value={formData.units}
              onChange={handleChange}
            />

            <FormInput
              id="total_amount"
              name="total_amount"
              label="Total Amount"
              type="number"
              required
              value={formData.total_amount}
              onChange={handleChange}
            />

            <FormInput
              id="service_charge"
              name="service_charge"
              label="Service Charge"
              type="number"
              required
              value={formData.service_charge}
              onChange={handleChange}
            />

            <FormInput
              id="paid_amount"
              name="paid_amount"
              label="Paid Amount"
              type="number"
              required
              value={formData.paid_amount}
              onChange={handleChange}
            />

            <div className="col-span-2">
              <Label className="mb-3">
                Date <span className="text-red-500">*</span>
              </Label>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between text-left font-normal"
                  >
                    {paidDate ? format(paidDate, "PPP") : "Pick a date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={paidDate}
                    onSelect={setPaidDate}
                    defaultMonth={paidDate}
                  />
                </PopoverContent>
              </Popover>
            </div>
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

export default UpdateMyBill;
