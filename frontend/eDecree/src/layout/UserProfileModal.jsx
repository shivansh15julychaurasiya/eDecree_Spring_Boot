import { useEffect, useRef } from "react";
import {
  XMarkIcon,
  ShieldCheckIcon,
  ClockIcon,
  EnvelopeIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  CheckCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const UserProfileModal = ({ user, isOpen, onClose }) => {
  const modalRef = useRef(null);

  // Close on backdrop click
  const handleBackdropClick = (e) => {
    // Close if clicking the outer container or the backdrop div itself
    if (e.target === e.currentTarget || e.target.dataset?.backdrop === "true") {
      onClose();
    }
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !user) return null;

  const initials = user.username?.charAt(0)?.toUpperCase() || "U";
  const roles = user.roles || [];

  // Demo profile data (can be replaced with real API data)
  const profileData = [
    {
      icon: EnvelopeIcon,
      label: "Email",
      value: `${user.username?.toLowerCase() || "user"}@allahabadhighcourt.in`,
      color: "text-primary-600",
      bg: "bg-primary-50",
    },
    {
      icon: BuildingOfficeIcon,
      label: "Department",
      value: "Decree Management",
      color: "text-info-600",
      bg: "bg-info-50",
    },
    {
      icon: CalendarIcon,
      label: "Member Since",
      value: "15 March 2023",
      color: "text-success-600",
      bg: "bg-success-50",
    },
    {
      icon: ClockIcon,
      label: "Last Login",
      value: new Date().toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      color: "text-warning-600",
      bg: "bg-warning-50",
    },
  ];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div data-backdrop="true" className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300" />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-100 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="relative h-32 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800">
          <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-xl bg-white text-slate-700 hover:bg-slate-100 hover:text-danger-600 transition-all duration-200 shadow-lg shadow-black/20 z-10"
            title="Close"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>

          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="currentColor" />
              </pattern>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>
        </div>

        {/* Profile Content */}
        <div className="px-6 pb-6">
          {/* Avatar */}
          <div className="relative -mt-14 mb-4 flex justify-center">
            <div className="relative">
              <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-4xl font-bold shadow-xl shadow-primary-500/30 ring-4 ring-white">
                {initials}
              </div>
              {/* Online Status */}
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center">
                <div className="w-5 h-5 bg-success-500 rounded-full border-2 border-white flex items-center justify-center">
                  <CheckCircleIcon className="h-3 w-3 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Name & Roles */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-slate-800">
              {user.username || "User"}
            </h2>
            <div className="flex items-center justify-center gap-1.5 mt-1.5">
              <ShieldCheckIcon className="h-4 w-4 text-primary-500" />
              <span className="text-sm text-slate-500 font-medium">
                {roles.join(", ")}
              </span>
            </div>
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success-50 text-success-700 text-xs font-semibold border border-success-100">
              <span className="w-1.5 h-1.5 rounded-full bg-success-500 animate-pulse" />
              Active Now
            </div>
          </div>

          {/* Info Cards Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {profileData.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="group p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md hover:border-slate-200 transition-all duration-200"
                >
                  <div
                    className={`w-9 h-9 rounded-lg ${item.bg} flex items-center justify-center mb-2.5`}
                  >
                    <Icon className={`h-4.5 w-4.5 ${item.color}`} />
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wide">
                    {item.label}
                  </p>
                  <p className="text-sm font-semibold text-slate-700 mt-0.5 truncate">
                    {item.value}
                  </p>
                </div>
              );
            })}
          </div>

         

          {/* Action Buttons */}
          {/* <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-medium text-sm hover:bg-slate-200 transition-colors"
            >
              <XMarkIcon className="h-4 w-4" />
              Close
            </button>
            <button
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white font-medium text-sm shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30 hover:from-primary-700 hover:to-primary-800 transition-all"
            >
              <UserIcon className="h-4 w-4" />
              Edit Profile
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;

