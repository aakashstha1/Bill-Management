import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PublicRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) return <>Loading...</>;
  return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoutes;
