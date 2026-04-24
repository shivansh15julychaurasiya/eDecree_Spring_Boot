import { useState, useMemo } from "react";
import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  BellIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { RouteConfig } from "../route/RouteConfig";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  // Dynamic page title from route config
  const pageTitle = useMemo(() => {
    for (const menu of RouteConfig) {
      for (const child of menu.children) {
        if (child.path === location.pathname) {
          return child.label;
        }
      }
    }
    return "eDecree";
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Overlay (mobile only) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-40
          transition-all duration-300 ease-in-out
          shadow-2xl shadow-slate-900/20
          
          /* Mobile */
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          
          /* Desktop */
          md:static md:translate-x-0 md:shadow-none
        `}
      >
        <Sidebar collapsed={collapsed} />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="sticky top-0 z-20 glass border-b border-slate-200/80 shadow-sm">
          <div className="px-4 md:px-6 h-16 flex items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center gap-3">
              {/* Mobile hamburger */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>

              {/* Desktop collapse toggle */}
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-all duration-200"
                title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <svg
                  className={`h-5 w-5 transition-transform duration-300 ${
                    collapsed ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Page Title */}
              <div className="flex flex-col">
                <h1 className="text-lg font-semibold text-slate-800 truncate">
                  {pageTitle}
                </h1>
                <span className="hidden sm:block text-xs text-slate-400">
                  {new Date().toLocaleDateString("en-IN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Notification Bell */}
              <button className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors">
                <BellIcon className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger-500 rounded-full ring-2 ring-white" />
              </button>

              {/* User Badge */}
              {/* <div className="hidden sm:flex items-center gap-2.5 pl-3 border-l border-slate-200">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-primary-500/20">
                  {user?.username?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-slate-700 leading-tight">
                    {user?.username || "User"}
                  </p>
                  <p className="text-xs text-slate-400 leading-tight">
                    {(user?.roles || []).join(", ")}
                  </p>
                </div>
              </div> */}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="group flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-danger-600 hover:bg-danger-50 border border-transparent hover:border-danger-100 transition-all duration-200"
                title="Logout"
              >
                <ArrowRightOnRectangleIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                <span className="hidden lg:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 md:p-8 min-h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

