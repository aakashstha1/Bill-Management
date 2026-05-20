export type User = {
  readonly _id: string;
  name: string;
  email?: string;
  contact?: string;
  role?: string;
  status?: boolean;
};

export type Users = {
  users: User[];
};

export type CreateUser = {
  name: string;
  email?: string;
  contact: string;
};

export type CreateUserResponse = {
  success: boolean;
  message: string;
  user: User;
};

// export type UpdateUserPayload = {
//   id: string;
// } & Partial<Pick<User, "name" | "email" | "contact">>;
// export type UpdateUserResponse = {
//   success: boolean;
//   message: string;
//   user: User;
// };
