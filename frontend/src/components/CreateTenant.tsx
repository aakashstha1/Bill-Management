import { useState } from "react";
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

import { useCreateUser } from "../hooks/users/useCreateUser";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import FormInput from "./shared/FormInput";

//Main Function
function CreateTenant() {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useCreateUser();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
  });
  // console.log("FormData:", formData);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      ...formData,
      email: formData.email || undefined,
    };

    mutate(payload, {
      onSuccess: (data) => {
        setFormData({
          name: "",
          email: "",
          contact: "",
        });
        toast.success(data?.message || "Tenant created successfully");
        setOpen(false);
      },
      onError: (err: unknown) => {
        const error = err as AxiosError<{ message: string }>;

        toast.error(
          error?.response?.data?.message || "Failed to create tenant",
        );
      },
    });
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="rounded-lg">
            Create Tenant <span className="text-2xl">+</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle className="font-bold text-lg">
                Fill Tenant Details's
              </DialogTitle>
            </DialogHeader>
            <FieldGroup className="gap-4 mt-4">
              <FormInput
                id="name"
                name="name"
                label="Name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
              />

              <FormInput
                id="email"
                name="email"
                label="Email"
                type="text"
                value={formData.email}
                onChange={handleChange}
              />

              <FormInput
                id="contact"
                name="contact"
                label="Contact"
                type="text"
                required
                value={formData.contact}
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
    </div>
  );
}

export default CreateTenant;
