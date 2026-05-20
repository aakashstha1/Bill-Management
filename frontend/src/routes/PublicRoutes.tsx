import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PublicRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <>Loading...</>;
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoutes;
