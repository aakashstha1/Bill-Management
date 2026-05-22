import type { ChangeEvent } from "react";
import { Field } from "../ui/field";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type FormInputProps = {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  type?: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function FormInput({
  id,
  name,
  label,
  required,
  type,
  value,
  onChange,
}: FormInputProps) {
  return (
    <Field>
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        id={id}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
    </Field>
  );
}

export default FormInput;
