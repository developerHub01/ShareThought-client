import { Input } from "@/components/Inputs/Input";
import clsx from "clsx";

interface InputFieldProps {
  label: string;
  id: string;
  isError?: boolean;
  type?: "text" | "number" | "email" | "password";
  className?: string;
}

const InputField = ({
  label,
  id,
  isError = false,
  className = "",
  type = "text",
  ...props
}: InputFieldProps) => (
  <Input
    placeholder={label}
    name={id}
    {...props}
    aria-invalid={isError}
    type={type}
    className={clsx("border placeholder:capitalize", className, {
      "border border-red-500": isError,
      "border border-transparent": !isError,
    })}
  />
);

export default InputField;
