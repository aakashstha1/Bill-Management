import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { BreadcrumbBasic } from "../components/BreadCrumbBasic";

function MainLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col transition-all duration-300 ml-2">
        <div className="px-8 pt-4">
          <BreadcrumbBasic />
        </div>

        {/* Page Content */}
        <div className="p-8 overflow-auto h-[calc(100vh-4rem)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
