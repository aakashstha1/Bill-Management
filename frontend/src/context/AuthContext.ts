import { createContext } from "react";

export type User = {
  readonly _id: string;
  name: string;
  email: string;
  role: string;
};
export type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => Promise<void>;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
