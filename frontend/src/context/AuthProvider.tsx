import { type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
// import {
// getMeAPI,
// logoutAPI,
// refreshAccessTokenAPI,
// } from "../services/auth.service";
// import type { AxiosError } from "axios";
import { useMe } from "../hooks/useMe";
import AuthLoader from "../components/AuthLoader";

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  // const [user, setUser] = useState<User | null>(null);
  // const [loading, setLoading] = useState<boolean>(true);

  const { data, isLoading } = useMe();

  const user = data ?? null;

  // const hasChecked = useRef(false);

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     if (hasChecked.current) return; // prevent multiple checks
  //     hasChecked.current = true;
  //     try {
  //       const res = await getMeAPI();
  //       // console.log(res.data);
  //       setUser(res.data);
  //     } catch (err: unknown) {
  //       const error = err as AxiosError;
  //       if (error.response?.status === 401) {
  //         try {
  //           await refreshAccessTokenAPI();
  //           const res = await getMeAPI();
  //           setUser(res.data);
  //         } catch {
  //           setUser(null);
  //         }
  //       } else {
  //         setUser(null);
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   checkAuth();
  // }, []);

  // const login = (user: User) => setUser(user);
  // const logout = async (): Promise<void> => {
  //   try {
  //     await logoutAPI();
  //   } finally {
  //     setUser(null);
  //   }
  // };

  // const logout = async (): Promise<void> => {
  //   await logoutAPI();
  // };
  if (isLoading) return <AuthLoader />;
  return (
    <AuthContext.Provider
      value={{ user, loading: isLoading, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
