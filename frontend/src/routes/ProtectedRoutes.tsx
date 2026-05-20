import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <>Loading...</>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoutes;
