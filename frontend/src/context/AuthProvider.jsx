import {
  getMeAPI,
  logoutAPI,
  refreshAccessTokenAPI,
} from "@/services/auth.service";
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const res = await getMeAPI();
        setUser(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
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

  const login = (user) => setUser(user);
  const logout = async () => {
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
