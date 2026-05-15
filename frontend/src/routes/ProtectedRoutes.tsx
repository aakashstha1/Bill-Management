import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) return <>Loading...</>;

  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoutes;
