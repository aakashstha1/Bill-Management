import type { LoginData, ValidationResult } from "../types/auth.types";

export function validateLogin(data: LoginData): ValidationResult {
  const errors: ValidationResult["errors"] = {};

  // Email
  if (!data.email) {
    errors.email = "Email is required";
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
    errors.email = "Email is invalid";
  }

  // Password
  if (!data.password) {
    errors.password = "Password is required";
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors,
  };
}
