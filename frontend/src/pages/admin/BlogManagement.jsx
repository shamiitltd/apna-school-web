import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Eye,
  Heart,
  Search,
  ChevronDown,
  LayoutList,
  Edit,
  Trash2,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  TrendingUp,
  Loader2,
  ExternalLink,
  CheckSquare,
  AlertCircle,
} from "lucide-react";

import heroAvatar from "../../assets/hero-avatar-blog.png";

export const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [sortBy, setSortBy] = useState("Latest");
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [metrics, setMetrics] = useState({
    totalPosts: 0,
    totalViews: 0,
    totalLikes: 0,
  });
  const [notification, setNotification] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const itemsPerPage = 8;
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const categories = [
    "All Categories",
    "For Parents",
    "For Students",
    "For Teachers",
    "Product Updates",
    "Tips & Guides",
    "Study Tips",
    "Productivity",
    "Exams",
    "Career",
  ];

  // Show temporary toast notification
  const showToast = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // 1. Fetch Blogs with dynamic server-side filters & metrics
  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage,
        limit: itemsPerPage,
        sortBy,
      });

      if (searchQuery.trim()) params.append("search", searchQuery.trim());
      if (selectedCategory !== "All Categories") params.append("category", selectedCategory);
      if (selectedStatus !== "All Status") params.append("status", selectedStatus);

      const res = await fetch(`${API_URL}/blogs?${params.toString()}`);
      const data = await res.json();

      if (data.success) {
        setBlogs(data.data || []);
        setTotalPages(data.totalPages || 1);
        setTotalCount(data.total || 0);
        if (data.stats) {
          setMetrics(data.stats);
        }
      }
    } catch (err) {
      console.error("Error fetching admin blogs: ", err);
      showToast("Error loading blogs from database", "error");
    } finally {
      setLoading(false);
    }
  }, [API_URL, currentPage, itemsPerPage, sortBy, searchQuery, selectedCategory, selectedStatus]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Checkbox Handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(blogs.map((b) => b._id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Delete Single Blog
  const handleDeleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) {
      return;
    }

    try {
      setIsDeleting(true);
      const res = await fetch(`${API_URL}/blogs/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        showToast("Blog post deleted successfully", "success");
        setSelectedIds((prev) => prev.filter((item) => item !== id));
        fetchBlogs();
      } else {
        showToast(data.message || "Failed to delete blog.", "error");
      }
    } catch (err) {
      console.error("Delete error:", err);
      showToast("Error deleting blog post.", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  // Bulk Delete Blogs
  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (
      !window.confirm(
        `Are you sure you want to delete all ${selectedIds.length} selected blog post(s)?`
      )
    ) {
      return;
    }

    try {
      setIsDeleting(true);
      const res = await fetch(`${API_URL}/blogs/bulk-delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(data.message || "Selected blogs deleted successfully", "success");
        setSelectedIds([]);
        fetchBlogs();
      } else {
        showToast(data.message || "Failed to bulk delete.", "error");
      }
    } catch (err) {
      console.error("Bulk delete error:", err);
      showToast("Error processing bulk deletion.", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  // Bulk Status Update (Publish / Draft)
  const handleBulkStatusChange = async (status) => {
    if (selectedIds.length === 0) return;

    try {
      const res = await fetch(`${API_URL}/blogs/bulk-status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds, status }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Selected blogs marked as ${status}`, "success");
        setSelectedIds([]);
        fetchBlogs();
      } else {
        showToast(data.message || "Failed to update status.", "error");
      }
    } catch (err) {
      console.error("Bulk status error:", err);
      showToast("Error updating status.", "error");
    }
  };

  // Category Badge Style Helper
  const getCategoryBadgeColor = (category) => {
    switch (category?.toLowerCase()) {
      case "for students":
      case "students":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "for parents":
      case "parents":
        return "bg-pink-50 text-pink-700 border-pink-100";
      case "for teachers":
      case "teachers":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "product updates":
        return "bg-purple-50 text-purple-700 border-purple-100";
      default:
        return "bg-blue-50 text-blue-700 border-blue-100";
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-[1400px] mx-auto pb-8">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-xl border flex items-center gap-3 transition-all transform animate-in slide-in-from-bottom-5 ${
            notification.type === "error"
              ? "bg-red-50 border-red-200 text-red-700"
              : "bg-emerald-50 border-emerald-200 text-emerald-800"
          }`}
        >
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="text-sm font-semibold">{notification.message}</span>
        </div>
      )}

      {/* ================= 1. PAGE HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600">
            BLOG MANAGEMENT
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#071d55] mt-1 tracking-tight">
            Manage Blog Content
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Create, edit, organize and publish engaging content for Apna School blog.
          </p>
        </div>

        <Link
          to="/admin/create-blog"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl shadow-md shadow-blue-600/20 transition-all duration-200 active:scale-[0.99] self-start sm:self-auto cursor-pointer"
        >
          <span>Create New Blog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* ================= 2. SUMMARY STATS CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Total Posts */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <FileText className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-3xl font-extrabold text-[#071d55]">
                {loading ? "..." : metrics.totalPosts}
              </h3>
              <p className="text-xs font-semibold text-slate-400 mt-0.5">
                Total Posts in Database
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-100">
            <TrendingUp className="w-3 h-3" />
            <span>Live</span>
          </div>
        </div>

        {/* Total Views */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Eye className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-3xl font-extrabold text-[#071d55]">
                {loading
                  ? "..."
                  : metrics.totalViews > 1000
                  ? `${(metrics.totalViews / 1000).toFixed(1)}K`
                  : metrics.totalViews}
              </h3>
              <p className="text-xs font-semibold text-slate-400 mt-0.5">
                Total Impressions
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-100">
            <TrendingUp className="w-3 h-3" />
            <span>+28%</span>
          </div>
        </div>

        {/* Total Likes */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Heart className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-3xl font-extrabold text-[#071d55]">
                {loading
                  ? "..."
                  : metrics.totalLikes > 1000
                  ? `${(metrics.totalLikes / 1000).toFixed(1)}K`
                  : metrics.totalLikes}
              </h3>
              <p className="text-xs font-semibold text-slate-400 mt-0.5">
                Reader Reactions
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-100">
            <TrendingUp className="w-3 h-3" />
            <span>+18%</span>
          </div>
        </div>
      </div>

      {/* ================= 3. FILTER & SEARCH BAR ROW ================= */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[260px] max-w-md">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search blogs by title, snippet, or author..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200/90 rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
          />
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="appearance-none bg-white border border-slate-200/90 pl-4 pr-10 py-3 rounded-2xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer shadow-2xs"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Status Dropdown */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="appearance-none bg-white border border-slate-200/90 pl-4 pr-10 py-3 rounded-2xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer shadow-2xs"
            >
              <option value="All Status">All Status</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
              <option value="Scheduled">Scheduled</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
              className="appearance-none bg-white border border-slate-200/90 pl-4 pr-10 py-3 rounded-2xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer shadow-2xs"
            >
              <option value="Latest">Sort by: Latest</option>
              <option value="Most Viewed">Sort by: Most Viewed</option>
              <option value="Most Liked">Sort by: Most Liked</option>
              <option value="Oldest">Sort by: Oldest</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ================= 3.5 BULK ACTION TOOLBAR ================= */}
      {selectedIds.length > 0 && (
        <div className="bg-blue-50/90 border border-blue-200/80 rounded-2xl px-5 py-3.5 flex flex-wrap items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
            <CheckSquare className="w-4 h-4 text-blue-600" />
            <span>{selectedIds.length} item(s) selected</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleBulkStatusChange("Published")}
              className="px-3 py-1.5 bg-white border border-blue-200 text-blue-700 hover:bg-blue-100/50 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Publish Selected
            </button>
            <button
              onClick={() => handleBulkStatusChange("Draft")}
              className="px-3 py-1.5 bg-white border border-blue-200 text-slate-700 hover:bg-slate-100 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Draft Selected
            </button>
            <button
              onClick={handleBulkDelete}
              disabled={isDeleting}
              className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Selected</span>
            </button>
          </div>
        </div>
      )}

      {/* ================= 4. BLOG POSTS TABLE ================= */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <p className="text-sm font-semibold text-slate-500">
              Loading real blog posts from database...
            </p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
            <FileText className="w-12 h-12 text-slate-300" />
            <p className="text-base font-bold text-slate-700">No blog posts found</p>
            <p className="text-xs text-slate-400 max-w-sm">
              Try modifying your search or filter keywords, or create a brand new blog post.
            </p>
            <Link
              to="/admin/create-blog"
              className="mt-2 px-5 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl"
            >
              Create New Blog
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-4 pl-6 pr-3 w-10">
                    <input
                      type="checkbox"
                      checked={
                        blogs.length > 0 && selectedIds.length === blogs.length
                      }
                      onChange={handleSelectAll}
                      className="w-4 h-4 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                  </th>
                  <th className="py-4 px-4 min-w-[320px]">Blog Post</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4 text-center">Views</th>
                  <th className="py-4 px-4 text-center">Likes</th>
                  <th className="py-4 px-4 min-w-[120px]">Date</th>
                  <th className="py-4 pr-6 pl-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {blogs.map((blog) => {
                  const isSelected = selectedIds.includes(blog._id);
                  const status = blog.status || "Published";

                  return (
                    <tr
                      key={blog._id}
                      className={`hover:bg-blue-50/30 transition-colors ${
                        isSelected ? "bg-blue-50/40" : ""
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-4 pl-6 pr-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectOne(blog._id)}
                          className="w-4 h-4 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                      </td>

                      {/* Blog Thumbnail + Info */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3.5">
                          <img
                            src={blog.image || heroAvatar}
                            alt={blog.title}
                            className="w-14 h-14 rounded-2xl object-cover bg-slate-100 border border-slate-100 shrink-0"
                          />
                          <div className="min-w-0">
                            <h4 className="text-sm font-bold text-[#071d55] line-clamp-1 hover:text-blue-600 cursor-pointer transition-colors">
                              {blog.title}
                            </h4>
                            <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                              {blog.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4">
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full border ${getCategoryBadgeColor(
                            blog.category
                          )}`}
                        >
                          {blog.category || "General"}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              status === "Published"
                                ? "bg-emerald-500"
                                : status === "Scheduled"
                                ? "bg-amber-500"
                                : "bg-slate-400"
                            }`}
                          />
                          <span className="text-xs font-semibold text-slate-700">
                            {status}
                          </span>
                        </div>
                      </td>

                      {/* Views */}
                      <td className="py-4 px-4 text-center text-xs font-bold text-slate-700">
                        {blog.views || 0}
                      </td>

                      {/* Likes */}
                      <td className="py-4 px-4 text-center text-xs font-bold text-slate-700">
                        {blog.likes || 0}
                      </td>

                      {/* Date */}
                      <td className="py-4 px-4">
                        <div className="text-xs font-bold text-slate-700">
                          {blog.author?.publishedAt || "Aug 20, 2024"}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {blog.author?.readTime || 5} min read
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 pr-6 pl-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View Live Blog */}
                          <Link
                            to={`/blog/${blog._id}`}
                            target="_blank"
                            title="View public blog post"
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>

                          {/* Edit */}
                          <Link
                            to={`/admin/edit-blog/${blog._id}`}
                            title="Edit blog post"
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => handleDeleteBlog(blog._id)}
                            title="Delete blog post"
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ================= 5. PAGINATION ROW ================= */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 pb-6">
        <p className="text-xs font-semibold text-slate-500">
          Showing{" "}
          <span className="text-slate-800 font-bold">
            {totalCount > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}
          </span>
          –
          <span className="text-slate-800 font-bold">
            {Math.min(currentPage * itemsPerPage, totalCount)}
          </span>{" "}
          of <span className="text-slate-800 font-bold">{totalCount}</span> posts
        </p>

        <div className="flex items-center gap-1.5">
          {/* Previous Page */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentPage === page
                  ? "bg-blue-600 text-white shadow-xs"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next Page */}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
