import { Outlet } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";

export const AdminLayout = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f8fbff] text-slate-900 font-sans">
      {/* Fixed Sticky Sidebar */}
      <AdminSidebar />

      {/* Independently Scrollable Main Content */}
      <main className="flex-1 min-w-0 h-full overflow-y-auto p-6 sm:p-8 lg:p-10">
        <Outlet />
      </main>
    </div>
  );
};
