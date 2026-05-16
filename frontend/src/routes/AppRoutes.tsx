import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
// import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";
import Tenants from "../pages/Tenants";
import TenantBills from "../pages/TenantBills";
import MyBills from "../pages/MyBills";

const AppRoute = createBrowserRouter([
  {
    element: <PublicRoutes />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
    ],
  },
  {
    // element: <ProtectedRoutes />,
    children: [
      {
        path: "dashboard",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "users",
            element: <Tenants />,
          },
          {
            path: "users-bill",
            element: <TenantBills />,
          },
          {
            path: "owner-bills",
            element: <MyBills />,
          },
        ],
      },
    ],
  },
]);

export default AppRoute;
