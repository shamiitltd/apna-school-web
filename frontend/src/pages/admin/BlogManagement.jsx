import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

export const BlogManagement = () => {
  return (
    <div className="flex flex-col gap-6 max-w-[1400px] mx-auto">
      {/* Header section without topmost search bar & profile box */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Blog Management
          </span>
          <h1 className="text-3xl font-extrabold text-[#071d55] mt-1">
            Manage Blog Content
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Create, edit, organize and publish engaging content for Apna School blog.
          </p>
        </div>

        <Link
          to="/admin/create-blog"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl shadow-sm transition-all active:scale-[0.99] self-start sm:self-auto"
        >
          <span>Create New Blog</span>
          <span className="text-base">→</span>
        </Link>
      </div>

      {/* Placeholder info box for next step */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xs text-center py-16">
        <h3 className="text-xl font-bold text-[#071d55]">Admin Login Verified!</h3>
        <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
          Authentication is fully working. We are ready to build the metrics stats cards and blog management table next.
        </p>
      </div>
    </div>
  );
};
