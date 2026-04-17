import { getMe } from "@/services/auth.service";
import { useEffect, useState } from "react";

export const AUthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const res = await getMe();
        setUser(res.data);
      } catch {
        setUser(null);
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
    <AuthContext.Provider value={{ user, login, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
