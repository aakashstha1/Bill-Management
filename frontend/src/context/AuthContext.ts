import { createContext } from "react";

export type User = unknown;
export type AuthContextType = {
  user: User | null;
  login: (user: User | null) => void;
  logout: () => Promise<void>;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
