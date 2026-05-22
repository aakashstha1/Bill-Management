import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "../ui/select";
import { Field } from "../ui/field";
import { Label } from "../ui/label";

type Option = {
  label: string;
  value: string;
};

type FormSelectProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  required?: boolean;
  placeholder?: string;
  options: Option[];
  onChange: (value: string) => void;
  isLoading?: boolean;
};

function FormSelect({
  id,
  label,
  value,
  required,
  placeholder = "Select option",
  options,
  onChange,
  isLoading = false,
}: FormSelectProps) {
  return (
    <Field>
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>

      <Select value={value} onValueChange={onChange} disabled={isLoading}>
        <SelectTrigger id={id} className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>

            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  );
}

export default FormSelect;
