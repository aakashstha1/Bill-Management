import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="h-screen">
      <Outlet />
    </div>
  );
}

export default MainLayout;
