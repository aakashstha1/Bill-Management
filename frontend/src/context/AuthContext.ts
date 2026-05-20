import { createContext } from "react";
import type { User } from "../types/user.types";

export type AuthContextType = {
  user: User | null;
  // login: (user: User) => void;
  // logout: () => Promise<void>;
  loading: boolean;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
