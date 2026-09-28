import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  FileText,
  PenSquare,
  Image,
  BarChart3,
  Users,
  Settings,
  LogOut,
  X,
  ExternalLink,
} from "lucide-react";
import logo from "../../assets/logo.png";
import adminSidebarImg from "../../assets/admin_sidebar.png";

export const AdminSidebar = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutGrid },
    { name: "Blog Management", path: "/admin/blogs", icon: FileText },
    { name: "Create Blog", path: "/admin/create-blog", icon: PenSquare },
    { name: "Media Library", path: "/admin/media", icon: Image },
    { name: "Analytics", path: "/admin/analytics", icon: BarChart3 },
    { name: "Subscribers", path: "/admin/subscribers", icon: Users },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    if (onClose) onClose();
    navigate("/admin/login");
  };

  const handleNavClick = () => {
    if (onClose) onClose();
  };

  return (
    <aside className="w-72 lg:w-64 bg-white border-r border-slate-100/90 h-full flex flex-col justify-between p-4.5 shrink-0 select-none overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {/* Top section: Logo & Nav Links */}
      <div className="flex flex-col gap-4">
        {/* Header with Logo and Mobile Close Button */}
        <div className="flex items-center justify-between px-2 py-1">
          <img src={logo} alt="Apna School" className="h-11 sm:h-12 w-auto object-contain" />
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1 mt-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={handleNavClick}
                className={({ isActive }) => {
                  const isDashboardActive =
                    item.path === "/admin/dashboard" &&
                    (location.pathname === "/admin" ||
                      location.pathname === "/admin/" ||
                      location.pathname === "/admin/dashboard");
                  const active = isActive || isDashboardActive;
                  return `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    active
                      ? "bg-[#eef5ff] text-[#2563eb] font-bold shadow-2xs"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`;
                }}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Promo Card, Live Site & Logout */}
      <div className="flex flex-col gap-2 pt-3 mt-auto">
        {/* View Live Website Button */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            if (onClose) onClose();
          }}
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-blue-600 bg-blue-50/70 hover:bg-blue-100/80 transition-colors"
        >
          <span>View Public Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        {/* Bottom Banner Image */}
        {adminSidebarImg && (
          <div className="hidden sm:block relative rounded-2xl overflow-hidden bg-[#edf5ff] p-1.5 text-center border border-blue-100/60 shadow-xs">
            <img
              src={adminSidebarImg}
              alt="Keep Creating"
              className="w-full max-h-32 object-contain rounded-xl"
            />
          </div>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer w-full text-left"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
