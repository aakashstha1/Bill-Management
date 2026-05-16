import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LogOut } from "lucide-react";

function Navbar() {
  const { user, logout, loading } = useAuth();
  // const user = false;
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  if (loading) return null;
  return (
    <nav className="bg-white shadow-lg px-6 py-3 flex items-center justify-between z-100">
      {/* Left: Logo */}
      <div>
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          LOGO
        </Link>
      </div>

      {/* Right: Auth buttons or Avatar */}
      <div>
        {loading ? (
          // small skeleton instead of returning null
          <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
        ) : !user ? (
          <div className="flex space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="relative">
            <div
              className="w-10 h-10 rounded-full cursor-pointer bg-gray-500 flex items-center justify-center text-white font-bold text-lg border-2 border-white outline-2 outline-blue-500"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {user?.name ? user?.name.charAt(0).toUpperCase() : "U"}
            </div>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg p-2 z-50">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center justify-between text-red-500 rounded-md"
                  onClick={handleLogout}
                >
                  Logout
                  <LogOut size={20} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
