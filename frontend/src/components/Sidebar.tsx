import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { Button } from "./ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faFileInvoice,
  faFileInvoiceDollar,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useLogout } from "../hooks/useLogout";
import { toast } from "sonner";
import { useSidebarStore } from "../stores/sidebar.store";
// import { useMe } from "../hooks/useMe";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  // const { data: user } = useMe();
  const { mutate, isPending } = useLogout();
  // const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const sidebarOpen = useSidebarStore((state) => state.sidebarOpen);
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    { name: "Tenants", path: "/dashboard/users", icon: <User size={20} /> },
    {
      name: "Tenant Bills",
      path: "/dashboard/users-bill",
      icon: <FontAwesomeIcon size="lg" icon={faFileInvoice} />,
    },
    {
      name: "My Bills",
      path: "/dashboard/owner-bills",
      icon: <FontAwesomeIcon size="lg" icon={faFileInvoiceDollar} />,
    },
  ];

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        toast.success("Logout successful");
        navigate("/", { replace: true });
      },
    });
  };

  return (
    <div
      className={`bg-white border-r border-gray-100 h-screen flex flex-col shrink-0 transition-all duration-300 ease-in-out ${
        sidebarOpen ? "w-56" : "w-16"
      }`}
    >
      {/* Toggle button */}
      <div className="flex items-center justify-end px-3 py-3 border-b border-gray-100">
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
        >
          {sidebarOpen ? (
            <PanelLeftClose size={18} />
          ) : (
            <PanelLeftOpen size={18} />
          )}
        </button>
      </div>

      <nav className="flex flex-col gap-1 p-2 mt-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              <div
                className={`shrink-0 ${isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-600"}`}
              >
                {item.icon}
              </div>

              <span
                className={`text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${
                  sidebarOpen ? "opacity-100 max-w-xs" : "opacity-0 max-w-0"
                }`}
              >
                {item.name}
              </span>

              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />
              )}
            </Link>
          );
        })}
      </nav>
      <div className="w-full mt-auto mb-6 p-2 flex flex-col  gap-4">
        <div className="flex items-center">
          {sidebarOpen ? (
            <Avatar size="lg">
              <AvatarImage src="" />
              <AvatarFallback>
                {" "}
                {user?.name ? user?.name.charAt(0).toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
          ) : (
            <HoverCard>
              <HoverCardTrigger>
                <Avatar size="lg">
                  <AvatarImage src="" />
                  <AvatarFallback>
                    {user?.name ? user?.name.charAt(0).toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
              </HoverCardTrigger>

              <HoverCardContent
                className="w-42"
                side="right"
                align="start"
                sideOffset={20}
              >
                <p className="text-sm font-semibold">{user?.email}</p>

                <Badge className="text-xs text-white bg-green-600">
                  {user?.role}
                </Badge>
              </HoverCardContent>
            </HoverCard>
          )}

          <div className={`ml-3 ${sidebarOpen ? "block" : "hidden"}`}>
            <p className="text-sm font-semibold">{user?.email}</p>

            <Badge className="text-xs text-white bg-green-600">
              {user?.role}
            </Badge>
          </div>
        </div>
        {/* Logout Button  */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="w-full rounded-xl"
              onClick={handleLogout}
              disabled={isPending}
            >
              <h1 className={`text-base ${sidebarOpen ? "block" : "hidden"}`}>
                Logout
              </h1>
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                size="lg"
                className="text-amber-400"
                // style={{ color: "rgb(227, 40, 40)" }}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Logout</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}

export default Sidebar;
