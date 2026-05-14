export type LoginData = {
  email: string;
  password: string;
};

export type ValidationResult = {
  isValid: boolean;
  errors: {
    email?: string;
    password?: string;
    general?: string;
  };
};
