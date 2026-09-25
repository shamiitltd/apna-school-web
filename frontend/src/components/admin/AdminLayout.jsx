import { Outlet } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";

export const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#f8fbff] text-slate-900 font-sans">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-6 sm:p-8 lg:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
