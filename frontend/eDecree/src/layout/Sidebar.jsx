import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { useState, useMemo, useEffect, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { RouteConfig } from "../route/RouteConfig";
import UserProfileModal from "./UserProfileModal";

const Sidebar = ({ collapsed }) => {
  const { user } = useSelector((state) => state.auth);
  const roles = user?.roles || [];
  const location = useLocation();

  const [openMenu, setOpenMenu] = useState(null);
  const [hoveredTooltip, setHoveredTooltip] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const tooltipRef = useRef(null);

  // Filter menus by role
  const menus = useMemo(() => {
    return RouteConfig.filter((menu) =>
      menu.roles.some((r) => roles.includes(r)),
    ).map((menu) => ({
      ...menu,
      children: menu.children.filter((child) =>
        child.roles.some((r) => roles.includes(r)),
      ),
    }));
  }, [roles]);

  // Auto open active menu
  useEffect(() => {
    menus.forEach((menu, index) => {
      menu.children.forEach((child) => {
        if (child.path === location.pathname) {
          setOpenMenu(index);
        }
      });
    });
  }, [location.pathname, menus]);

  const toggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  return (
    <div
      className={`relative h-full flex flex-col bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-slate-300 transition-all duration-300 ease-in-out ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Top subtle glow */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-primary-600/5 pointer-events-none" />

      {/* Logo Area */}
      <div className="relative z-10 flex items-center justify-center h-16 border-b border-slate-700/60">
        {collapsed ? (
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg shadow-primary-500/20">
            <span className="text-white font-bold text-lg">E</span>
          </div>
        ) : (
          <div className="flex items-center gap-3 px-4">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg shadow-primary-500/20">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg tracking-tight">
                eDecree
              </span>
              <span className="text-[10px] text-slate-400 -mt-1 tracking-widest uppercase">
                High Court
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 sidebar-scrollbar">
        {menus.map((menu, index) => {
          const isOpen = openMenu === index;
          const hasActiveChild = menu.children.some(
            (child) => child.path === location.pathname,
          );
          const ParentIcon = menu.icon;

          return (
            <div key={menu.name} className="relative">
              {/* Parent Item */}
              <div
                onClick={() => !collapsed && toggleMenu(index)}
                onMouseEnter={() => collapsed && setHoveredTooltip(menu.name)}
                onMouseLeave={() => setHoveredTooltip(null)}
                className={`group flex items-center rounded-lg cursor-pointer transition-all duration-200 ${
                  collapsed
                    ? "justify-center w-12 h-12 mx-auto"
                    : "px-3 py-2.5 justify-between"
                } ${
                  isOpen || hasActiveChild
                    ? "bg-slate-700/50 text-white"
                    : "hover:bg-slate-800/80 hover:text-white"
                }`}
              >
                <div className={`flex items-center gap-3 ${collapsed ? "" : ""}`}>
                  {ParentIcon && (
                    <ParentIcon
                      className={`h-5 w-5 transition-colors duration-200 flex-shrink-0 ${
                        isOpen || hasActiveChild
                          ? "text-primary-400"
                          : "text-slate-400 group-hover:text-primary-400"
                      }`}
                    />
                  )}
                  {!collapsed && (
                    <span className="text-sm font-medium">{menu.name}</span>
                  )}
                </div>

                {!collapsed && menu.children.length > 0 && (
                  <ChevronDownIcon
                    className={`h-4 w-4 text-slate-500 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-primary-400" : ""
                    }`}
                  />
                )}
              </div>

              {/* Collapsed tooltip */}
              {collapsed && hoveredTooltip === menu.name && (
                <div
                  ref={tooltipRef}
                  className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-slate-800 text-white text-xs font-medium rounded-md shadow-xl border border-slate-700 whitespace-nowrap z-50"
                >
                  {menu.name}
                  <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-slate-800 border-l border-b border-slate-700 rotate-45" />
                </div>
              )}

              {/* Children */}
              {!collapsed && (
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: isOpen ? `${menu.children.length * 44 + 8}px` : "0px",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="ml-5 mt-1 space-y-0.5 border-l-2 border-slate-700/50 pl-3">
                    {menu.children.map((child) => {
                      const ChildIcon = child.icon;

                      // External link → New Tab
                      if (child.external) {
                        return (
                          <a
                            key={child.path}
                            href={child.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all duration-200"
                          >
                            {ChildIcon && (
                              <ChildIcon className="h-4 w-4 text-slate-500 group-hover:text-primary-400 transition-colors" />
                            )}
                            <span>{child.label}</span>
                            <svg
                              className="h-3 w-3 ml-auto text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </a>
                        );
                      }

                      // Internal route
                      return (
                        <NavLink
                          key={child.path}
                          to={child.path}
                          className={({ isActive }) =>
                            `group flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                              isActive
                                ? "bg-primary-500/15 text-primary-300 border-r-2 border-primary-500"
                                : "text-slate-400 hover:text-white hover:bg-slate-800/60 border-r-2 border-transparent"
                            }`
                          }
                        >
                          {ChildIcon && (
                            <ChildIcon
                              className={`h-4 w-4 transition-colors ${
                                location.pathname === child.path
                                  ? "text-primary-400"
                                  : "text-slate-500 group-hover:text-primary-400"
                              }`}
                            />
                          )}
                          <span className="truncate">{child.label}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Section — Clickable User Profile */}
      <div
        className="relative z-10 p-4 border-t border-slate-700/60 cursor-pointer hover:bg-slate-800/60 transition-colors duration-200 group"
        onClick={() => setProfileOpen(true)}
        title="View Profile"
      >
        {collapsed ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-primary-500/20 group-hover:scale-110 transition-transform">
              {user?.username?.charAt(0)?.toUpperCase() || "U"}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-primary-500/20 flex-shrink-0 group-hover:scale-110 transition-transform">
              {user?.username?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.username || "User"}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {(user?.roles || []).join(", ")}
              </p>
            </div>
            <svg
              className="h-4 w-4 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* User Profile Modal */}
      <UserProfileModal
        user={user}
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
      />
    </div>
  );
};

export default Sidebar;

