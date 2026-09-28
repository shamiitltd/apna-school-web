import { useState, useEffect } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";
import { SEOHead } from "../SEOHead";
import { Menu, Plus, ExternalLink, ShieldCheck } from "lucide-react";
import logo from "../../assets/logo.png";

export const AdminLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location.pathname]);

  // Security: Remove admin token when leaving the admin portal
  useEffect(() => {
    return () => {
      localStorage.removeItem("adminToken");
      sessionStorage.removeItem("adminToken");
    };
  }, []);

  // Prevent background scrolling when mobile sidebar is open
  useEffect(() => {
    if (mobileSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileSidebarOpen]);

  return (
    <>
      <SEOHead
        title="Admin Control Panel"
        description="Private Administrative Portal for Apna School."
        noIndex={true}
      />
      <div className="flex h-screen w-full overflow-hidden bg-[#f8fbff] text-slate-900 font-sans">
        {/* Desktop Sticky Sidebar (Visible on lg and larger screens) */}
        <div className="hidden lg:block h-full shrink-0">
          <AdminSidebar />
        </div>

        {/* Mobile Slide-Out Drawer + Overlay (Visible on smaller screens when open) */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs transition-opacity lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        <div
          className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out lg:hidden ${
            mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <AdminSidebar onClose={() => setMobileSidebarOpen(false)} />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          {/* Mobile Top Header Bar (Shown on < lg screens) */}
          <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-100 shrink-0 z-30 shadow-2xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="p-2 -ml-1 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              <Link to="/admin/dashboard" className="flex items-center">
                <img src={logo} alt="Apna School" className="h-8 w-auto object-contain" />
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/admin/create-blog"
                className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center shadow-xs"
                title="Create New Blog"
              >
                <Plus className="w-4 h-4" />
              </Link>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                title="View Website"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </header>

          {/* Independently Scrollable Page Content */}
          <main className="flex-1 min-w-0 h-full overflow-y-auto p-4 sm:p-6 lg:p-8 [scrollbar-width:thin]">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};
