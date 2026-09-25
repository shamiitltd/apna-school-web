import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  PenSquare,
  Image,
  BarChart3,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import logo from "../../assets/logo.png";
import adminSidebarImg from "../../assets/admin_sidebar.png";

export const AdminSidebar = () => {
  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Blog Management", path: "/admin/blogs", icon: FileText },
    { name: "Create Blog", path: "/admin/create-blog", icon: PenSquare },
    { name: "Media Library", path: "/admin/media", icon: Image },
    { name: "Analytics", path: "/admin/analytics", icon: BarChart3 },
    { name: "Subscribers", path: "/admin/subscribers", icon: Users },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-100 min-h-screen flex flex-col justify-between p-5 shrink-0 select-none">
      <div>
        {/* Logo */}
        <div className="px-2 py-2 mb-6">
          <img src={logo} alt="Apna School" className="h-16 w-auto object-contain" />
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50 text-blue-600 shadow-xs"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Promo Card & Logout */}
      <div className="flex flex-col gap-3">
        {/* Bottom Banner Image */}
        <div className="relative rounded-2xl overflow-hidden bg-[#edf5ff] p-3 text-center border border-blue-100/60 shadow-xs">
          {adminSidebarImg ? (
            <img
              src={adminSidebarImg}
              alt="Keep Creating"
              className="w-full h-auto object-contain rounded-xl"
            />
          ) : (
            <div className="p-2 text-xs text-blue-800 font-medium">
              Keep creating valuable content for a brighter tomorrow!
            </div>
          )}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer w-full text-left"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
