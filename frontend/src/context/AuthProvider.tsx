import { useEffect, useRef, useState, type ReactNode } from "react";
import { AuthContext, type User } from "./AuthContext";
import {
  getMeAPI,
  logoutAPI,
  refreshAccessTokenAPI,
} from "../services/auth.service";
import type { AxiosError } from "axios";

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const hasChecked = useRef(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (hasChecked.current) return; // prevent multiple checks
      hasChecked.current = true;
      try {
        const res = await getMeAPI();
        // console.log(res.data);
        setUser(res.data);
      } catch (err: unknown) {
        const error = err as AxiosError;
        if (error.response?.status === 401) {
          try {
            await refreshAccessTokenAPI();
            const res = await getMeAPI();
            setUser(res.data);
          } catch {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = (user: User) => setUser(user);
  const logout = async (): Promise<void> => {
    try {
      await logoutAPI();
    } finally {
      setUser(null);
    }
  };
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
