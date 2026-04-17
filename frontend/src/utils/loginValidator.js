// ----------------------------------------------- Login Validation --------------------------------------
export function validateLogin(data) {
  if (!data.email || !data.password) {
    return {
      isValid: false,
      errors: { general: "All fields are required" },
    };
  }
  // Email
  if (!data.email) {
    return {
      isValid: false,
      errors: { email: "Email is required" },
    };
  }

  if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
    return {
      isValid: false,
      errors: { email: "Email is invalid" },
    };
  }

  // Password
  if (!data.password) {
    return {
      isValid: false,
      errors: { password: "Password is required" },
    };
  }

  return { isValid: true, errors: {} };
}
